// ══════════════════════════════════════════════════════════════════════
// ORB — Opening Range Breakout Backtester (NQ Futures)
// Port of ORB_NQ_Strategy.pine to Node.js
// ══════════════════════════════════════════════════════════════════════

const SYMBOL = 'NQ%3DF';
const INTERVAL = '5m';
const RANGE = '60d';
const URL = `https://query1.finance.yahoo.com/v8/finance/chart/${SYMBOL}?interval=${INTERVAL}&range=${RANGE}`;

// ── Strategy Parameters ───────────────────────────────────────────────
const CONFIG = {
  orbMinutes: 15,          // 3 candles on 5min
  sessionStartHour: 9,
  sessionStartMin: 30,
  rrRatio: 2.0,
  maxTradesPerDay: 2,
  cutoffHour: 14,
  cutoffMin: 0,
  minRangePoints: 5,
  maxRangePoints: 80,
  eodHour: 15,
  eodMin: 55,
  commissionPerSide: 2.50, // $2.50 per contract per side
  startingCapital: 50000,
  pointValue: 20,          // NQ = $20/point
  contracts: 1,
};

// ── Helpers ───────────────────────────────────────────────────────────

function tsToET(timestamp) {
  const d = new Date(timestamp * 1000);
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: 'numeric', minute: 'numeric', hour12: false,
  }).formatToParts(d);

  const get = (type) => parts.find(p => p.type === type)?.value;
  return {
    year: parseInt(get('year')),
    month: parseInt(get('month')),
    day: parseInt(get('day')),
    hour: parseInt(get('hour')),
    minute: parseInt(get('minute')),
    date: `${get('year')}-${get('month')}-${get('day')}`,
    timeMin: parseInt(get('hour')) * 60 + parseInt(get('minute')),
  };
}

function timeMinToStr(timeMin) {
  const h = Math.floor(timeMin / 60);
  const m = timeMin % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// ── Fetch Data ────────────────────────────────────────────────────────

async function fetchCandles() {
  console.log(`Fetching ${SYMBOL} ${INTERVAL} data for ${RANGE}...`);
  console.log(`URL: ${URL}\n`);

  const res = await fetch(URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    },
  });

  if (!res.ok) {
    throw new Error(`Yahoo Finance HTTP ${res.status}: ${res.statusText}`);
  }

  const json = await res.json();
  const result = json.chart?.result?.[0];
  if (!result) throw new Error('No chart data returned from Yahoo Finance');

  const timestamps = result.timestamp;
  const quote = result.indicators?.quote?.[0];
  if (!timestamps || !quote) throw new Error('Missing timestamp or quote data');

  const candles = [];
  for (let i = 0; i < timestamps.length; i++) {
    const o = quote.open[i];
    const h = quote.high[i];
    const l = quote.low[i];
    const c = quote.close[i];
    // Skip null candles
    if (o == null || h == null || l == null || c == null) continue;

    const et = tsToET(timestamps[i]);

    // Filter to RTH only: 9:30 AM - 4:00 PM ET
    const rthStart = 9 * 60 + 30;  // 570
    const rthEnd = 16 * 60;         // 960
    if (et.timeMin < rthStart || et.timeMin >= rthEnd) continue;

    // Skip weekends (0=Sun, 6=Sat)
    const dayOfWeek = new Date(timestamps[i] * 1000).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    candles.push({
      ts: timestamps[i],
      open: o,
      high: h,
      low: l,
      close: c,
      ...et,
    });
  }

  console.log(`Total RTH candles: ${candles.length}`);
  return candles;
}

// ── Group by Trading Day ──────────────────────────────────────────────

function groupByDay(candles) {
  const days = {};
  for (const c of candles) {
    if (!days[c.date]) days[c.date] = [];
    days[c.date].push(c);
  }
  return days;
}

// ── Run Backtest ──────────────────────────────────────────────────────

function backtest(candles) {
  const days = groupByDay(candles);
  const sortedDates = Object.keys(days).sort();

  const trades = [];
  const { orbMinutes, sessionStartHour, sessionStartMin, rrRatio,
    maxTradesPerDay, cutoffHour, cutoffMin, eodHour, eodMin,
    minRangePoints, maxRangePoints, commissionPerSide, pointValue, contracts } = CONFIG;

  const orbStartMin = sessionStartHour * 60 + sessionStartMin; // 570
  const orbEndMin = orbStartMin + orbMinutes;                    // 585
  const cutoffMin_ = cutoffHour * 60 + cutoffMin;               // 840
  const eodMin_ = eodHour * 60 + eodMin;                        // 955

  console.log(`\nTrading days found: ${sortedDates.length}`);
  console.log(`ORB window: ${timeMinToStr(orbStartMin)} - ${timeMinToStr(orbEndMin)} ET`);
  console.log(`Trade window: ${timeMinToStr(orbEndMin)} - ${timeMinToStr(cutoffMin_)} ET`);
  console.log(`EOD close: ${timeMinToStr(eodMin_)} ET`);
  console.log(`R:R = 1:${rrRatio}, Range filter: ${minRangePoints}-${maxRangePoints} pts`);
  console.log('─'.repeat(70));

  for (const date of sortedDates) {
    const dayCandles = days[date];
    if (dayCandles.length < 4) continue; // Need ORB + at least 1 trade candle

    // ── Build ORB ──
    const orbCandles = dayCandles.filter(c => c.timeMin >= orbStartMin && c.timeMin < orbEndMin);
    if (orbCandles.length === 0) continue;

    const orbHigh = Math.max(...orbCandles.map(c => c.high));
    const orbLow = Math.min(...orbCandles.map(c => c.low));
    const orbRange = orbHigh - orbLow;

    // Range filter
    if (orbRange < minRangePoints || orbRange > maxRangePoints) continue;

    // ── Scan for trades ──
    const tradeCandles = dayCandles.filter(c => c.timeMin >= orbEndMin);
    let dailyTrades = 0;
    let position = null; // { dir, entry, sl, tp }

    for (let i = 0; i < tradeCandles.length; i++) {
      const bar = tradeCandles[i];
      const prevBar = i > 0 ? tradeCandles[i - 1] : orbCandles[orbCandles.length - 1];

      // ── Check open position against current bar ──
      if (position) {
        let exitPrice = null;
        let exitReason = '';

        if (position.dir === 'LONG') {
          // Conservative: check SL first
          if (bar.low <= position.sl) {
            exitPrice = position.sl;
            exitReason = 'SL';
          } else if (bar.high >= position.tp) {
            exitPrice = position.tp;
            exitReason = 'TP';
          }
        } else {
          // SHORT
          if (bar.high >= position.sl) {
            exitPrice = position.sl;
            exitReason = 'SL';
          } else if (bar.low <= position.tp) {
            exitPrice = position.tp;
            exitReason = 'TP';
          }
        }

        // EOD close at 3:55 PM
        if (!exitPrice && bar.timeMin >= eodMin_) {
          exitPrice = bar.close;
          exitReason = 'EOD';
        }

        if (exitPrice) {
          const pnlPoints = position.dir === 'LONG'
            ? exitPrice - position.entry
            : position.entry - exitPrice;
          const pnlDollars = pnlPoints * pointValue * contracts;
          const commission = commissionPerSide * 2 * contracts; // round trip

          trades.push({
            date,
            dir: position.dir,
            entry: position.entry,
            sl: position.sl,
            tp: position.tp,
            exit: exitPrice,
            exitReason,
            pnlPoints,
            pnlDollars: pnlDollars - commission,
            commission,
            orbHigh,
            orbLow,
            orbRange,
          });
          position = null;
        }

        // If still in position, skip entry logic for this bar
        if (position) continue;
      }

      // ── Entry logic (only if no position and under trade limits) ──
      if (dailyTrades >= maxTradesPerDay) continue;
      if (bar.timeMin >= cutoffMin_) continue; // No entries after cutoff
      if (!prevBar) continue;

      // LONG breakout
      if (bar.close > orbHigh && prevBar.close <= orbHigh && !position) {
        const entry = bar.close;
        const sl = orbLow;
        const tp = entry + (entry - sl) * rrRatio;
        position = { dir: 'LONG', entry, sl, tp };
        dailyTrades++;
        continue; // Don't check short on same bar
      }

      // SHORT breakout
      if (bar.close < orbLow && prevBar.close >= orbLow && !position) {
        const entry = bar.close;
        const sl = orbHigh;
        const tp = entry - (sl - entry) * rrRatio;
        position = { dir: 'SHORT', entry, sl, tp };
        dailyTrades++;
      }
    }

    // Force close any remaining position at last bar close
    if (position) {
      const lastBar = tradeCandles[tradeCandles.length - 1];
      const pnlPoints = position.dir === 'LONG'
        ? lastBar.close - position.entry
        : position.entry - lastBar.close;
      const pnlDollars = pnlPoints * pointValue * contracts;
      const commission = commissionPerSide * 2 * contracts;

      trades.push({
        date,
        dir: position.dir,
        entry: position.entry,
        sl: position.sl,
        tp: position.tp,
        exit: lastBar.close,
        exitReason: 'EOD',
        pnlPoints,
        pnlDollars: pnlDollars - commission,
        commission,
        orbHigh,
        orbLow,
        orbRange,
      });
    }
  }

  return trades;
}

// ── Report ────────────────────────────────────────────────────────────

function printReport(trades) {
  console.log('\n' + '='.repeat(70));
  console.log('  ORB BACKTEST REPORT — NQ=F 5min (Last 60 Days)');
  console.log('='.repeat(70));

  if (trades.length === 0) {
    console.log('\nNo trades were generated. Check data and parameters.');
    return;
  }

  const winners = trades.filter(t => t.pnlDollars > 0);
  const losers = trades.filter(t => t.pnlDollars <= 0);
  const totalPnL = trades.reduce((sum, t) => sum + t.pnlDollars, 0);
  const totalCommission = trades.reduce((sum, t) => sum + t.commission, 0);

  const avgWin = winners.length > 0
    ? winners.reduce((s, t) => s + t.pnlDollars, 0) / winners.length : 0;
  const avgLoss = losers.length > 0
    ? Math.abs(losers.reduce((s, t) => s + t.pnlDollars, 0) / losers.length) : 0;

  const grossWins = winners.reduce((s, t) => s + t.pnlDollars, 0);
  const grossLosses = Math.abs(losers.reduce((s, t) => s + t.pnlDollars, 0));
  const profitFactor = grossLosses > 0 ? grossWins / grossLosses : Infinity;

  // Max drawdown
  let peak = CONFIG.startingCapital;
  let maxDD = 0;
  let equity = CONFIG.startingCapital;
  for (const t of trades) {
    equity += t.pnlDollars;
    if (equity > peak) peak = equity;
    const dd = peak - equity;
    if (dd > maxDD) maxDD = dd;
  }

  // Max consecutive losses
  let maxConsecLosses = 0;
  let currentStreak = 0;
  for (const t of trades) {
    if (t.pnlDollars <= 0) {
      currentStreak++;
      if (currentStreak > maxConsecLosses) maxConsecLosses = currentStreak;
    } else {
      currentStreak = 0;
    }
  }

  // Best/worst day
  const dailyPnL = {};
  for (const t of trades) {
    dailyPnL[t.date] = (dailyPnL[t.date] || 0) + t.pnlDollars;
  }
  const dailyEntries = Object.entries(dailyPnL);
  const bestDay = dailyEntries.reduce((best, [d, pnl]) => pnl > best[1] ? [d, pnl] : best, ['', -Infinity]);
  const worstDay = dailyEntries.reduce((worst, [d, pnl]) => pnl < worst[1] ? [d, pnl] : worst, ['', Infinity]);

  // Longs vs shorts
  const longs = trades.filter(t => t.dir === 'LONG');
  const shorts = trades.filter(t => t.dir === 'SHORT');
  const longWins = longs.filter(t => t.pnlDollars > 0).length;
  const shortWins = shorts.filter(t => t.pnlDollars > 0).length;

  console.log(`\n  Starting Capital:     $${CONFIG.startingCapital.toLocaleString()}`);
  console.log(`  Final Equity:         $${equity.toFixed(2)}`);
  console.log(`  Net Return:           ${((equity - CONFIG.startingCapital) / CONFIG.startingCapital * 100).toFixed(2)}%`);

  console.log('\n--- OVERVIEW ---');
  console.log(`  Total Trades:         ${trades.length}`);
  console.log(`  Winners:              ${winners.length}`);
  console.log(`  Losers:               ${losers.length}`);
  console.log(`  Win Rate:             ${(winners.length / trades.length * 100).toFixed(1)}%`);

  console.log('\n--- BY DIRECTION ---');
  console.log(`  Long Trades:          ${longs.length} (${longWins} wins, ${(longs.length > 0 ? longWins/longs.length*100 : 0).toFixed(1)}% WR)`);
  console.log(`  Short Trades:         ${shorts.length} (${shortWins} wins, ${(shorts.length > 0 ? shortWins/shorts.length*100 : 0).toFixed(1)}% WR)`);

  console.log('\n--- P&L ---');
  console.log(`  Total P&L:            $${totalPnL.toFixed(2)}`);
  console.log(`  Total Commission:     $${totalCommission.toFixed(2)}`);
  console.log(`  Avg Winner:           $${avgWin.toFixed(2)}`);
  console.log(`  Avg Loser:            -$${avgLoss.toFixed(2)}`);
  console.log(`  Profit Factor:        ${profitFactor === Infinity ? 'INF' : profitFactor.toFixed(2)}`);
  console.log(`  Avg P&L per Trade:    $${(totalPnL / trades.length).toFixed(2)}`);

  console.log('\n--- RISK ---');
  console.log(`  Max Drawdown:         $${maxDD.toFixed(2)} (${(maxDD / CONFIG.startingCapital * 100).toFixed(2)}%)`);
  console.log(`  Max Consec. Losses:   ${maxConsecLosses}`);

  console.log('\n--- BEST / WORST ---');
  console.log(`  Best Day:             ${bestDay[0]}  $${bestDay[1].toFixed(2)}`);
  console.log(`  Worst Day:            ${worstDay[0]}  $${worstDay[1].toFixed(2)}`);

  // ── Trade Log ──
  console.log('\n' + '='.repeat(70));
  console.log('  TRADE LOG');
  console.log('='.repeat(70));
  console.log(
    '  Date       | Dir   | Entry     | SL        | TP        | Exit      | Reason | P&L'
  );
  console.log('  ' + '-'.repeat(95));

  for (const t of trades) {
    const pnlStr = t.pnlDollars >= 0
      ? `+$${t.pnlDollars.toFixed(2)}`
      : `-$${Math.abs(t.pnlDollars).toFixed(2)}`;
    console.log(
      `  ${t.date} | ${t.dir.padEnd(5)} | ${t.entry.toFixed(2).padStart(9)} | ${t.sl.toFixed(2).padStart(9)} | ${t.tp.toFixed(2).padStart(9)} | ${t.exit.toFixed(2).padStart(9)} | ${t.exitReason.padEnd(6)} | ${pnlStr}`
    );
  }

  // ── Equity Curve (simple text) ──
  console.log('\n' + '='.repeat(70));
  console.log('  EQUITY CURVE');
  console.log('='.repeat(70));
  equity = CONFIG.startingCapital;
  for (const t of trades) {
    equity += t.pnlDollars;
    const bar = equity >= CONFIG.startingCapital ? '+' : '-';
    const deviation = equity - CONFIG.startingCapital;
    const barLen = Math.min(Math.abs(Math.round(deviation / 200)), 40);
    const visual = deviation >= 0
      ? ' '.repeat(20) + '|' + '#'.repeat(barLen)
      : ' '.repeat(Math.max(20 - barLen, 0)) + '#'.repeat(barLen) + '|';
    console.log(`  ${t.date} $${equity.toFixed(0).padStart(7)} ${visual}`);
  }

  console.log('\n' + '='.repeat(70));
}

// ── Main ──────────────────────────────────────────────────────────────

async function main() {
  console.log('='.repeat(70));
  console.log('  ORB BACKTESTER v1.0 — NQ Futures (Opening Range Breakout)');
  console.log('='.repeat(70));

  try {
    const candles = await fetchCandles();
    const trades = backtest(candles);
    printReport(trades);
  } catch (err) {
    console.error('\nFATAL ERROR:', err.message);
    if (err.cause) console.error('Cause:', err.cause);
    process.exit(1);
  }
}

main();
