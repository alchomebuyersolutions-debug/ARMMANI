"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calculator,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Target,
    RotateCcw,
    ChevronDown,
    ChevronUp,
    Sparkles,
    HelpCircle,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";

/* ═══════════════════════════════════════════
   Simulation Engine (Monte Carlo)
   ═══════════════════════════════════════════ */

function runSimulation({
    startingBalance,
    winRate,
    takeProfit,
    stopLoss,
    numTrades,
    leverage,
    entryFee,
    exitFee,
}) {
    const history = [];
    let balance = startingBalance;
    let wins = 0;
    let losses = 0;
    let maxBalance = balance;
    let maxDrawdown = 0;

    for (let i = 1; i <= numTrades; i++) {
        const isWin = Math.random() * 100 < winRate;
        const positionSize = balance * leverage;
        const entryFeeCost = positionSize * (entryFee / 100);
        const exitFeeCost = positionSize * (exitFee / 100);
        const totalFees = entryFeeCost + exitFeeCost;

        let pnl;
        if (isWin) {
            pnl = positionSize * (takeProfit / 100) - totalFees;
            wins++;
        } else {
            pnl = -(positionSize * (stopLoss / 100) + totalFees);
            losses++;
        }

        balance += pnl;
        if (balance < 0) balance = 0;

        if (balance > maxBalance) maxBalance = balance;
        const currentDrawdown = ((maxBalance - balance) / maxBalance) * 100;
        if (currentDrawdown > maxDrawdown) maxDrawdown = currentDrawdown;

        history.push({
            trade: i,
            result: isWin ? "Win" : "Loss",
            balance: Math.round(balance * 100) / 100,
            entrySize: Math.round(positionSize * 100) / 100,
            exitSize: Math.round((positionSize + pnl) * 100) / 100,
            pnl: Math.round(pnl * 100) / 100,
        });

        if (balance <= 0) break;
    }

    const netProfit = balance - startingBalance;
    const returnPct = (netProfit / startingBalance) * 100;
    const riskReward = stopLoss > 0 ? takeProfit / stopLoss : 0;
    const expectancy = winRate / 100 * takeProfit - (1 - winRate / 100) * stopLoss;

    return {
        history,
        stats: {
            netProfit: Math.round(netProfit * 100) / 100,
            finalBalance: Math.round(balance * 100) / 100,
            returnPct: Math.round(returnPct * 100) / 100,
            wins,
            losses,
            riskReward: Math.round(riskReward * 100) / 100,
            maxDrawdown: Math.round(maxDrawdown * 100) / 100,
            expectancy: Math.round(expectancy * 100) / 100,
        },
    };
}

/* ═══════════════════════════════════════════
   SVG Equity Curve
   ═══════════════════════════════════════════ */

function EquityCurve({ history, startingBalance }) {
    if (!history || history.length === 0) return null;

    const W = 700;
    const H = 260;
    const PAD_X = 50;
    const PAD_Y = 30;
    const plotW = W - PAD_X * 2;
    const plotH = H - PAD_Y * 2;

    const balances = [startingBalance, ...history.map((t) => t.balance)];
    const minB = Math.min(...balances) * 0.95;
    const maxB = Math.max(...balances) * 1.05;
    const rangeB = maxB - minB || 1;

    const toX = (i) => PAD_X + (i / (balances.length - 1)) * plotW;
    const toY = (val) => PAD_Y + plotH - ((val - minB) / rangeB) * plotH;

    const points = balances.map((b, i) => `${toX(i)},${toY(b)}`).join(" ");
    const fillPoints = `${toX(0)},${PAD_Y + plotH} ${points} ${toX(balances.length - 1)},${PAD_Y + plotH}`;

    const isProfit = balances[balances.length - 1] >= startingBalance;
    const lineColor = isProfit ? "var(--accent-green)" : "var(--primary)";

    // Y-axis labels
    const yTicks = 5;
    const yLabels = [];
    for (let i = 0; i <= yTicks; i++) {
        const val = minB + (rangeB / yTicks) * i;
        yLabels.push({ y: toY(val), label: `$${val >= 1000 ? (val / 1000).toFixed(1) + "k" : Math.round(val)}` });
    }

    // X-axis labels
    const xCount = Math.min(6, balances.length);
    const xLabels = [];
    for (let i = 0; i < xCount; i++) {
        const idx = Math.round((i / (xCount - 1)) * (balances.length - 1));
        xLabels.push({ x: toX(idx), label: idx === 0 ? "Start" : `#${idx}` });
    }

    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <svg
                viewBox={`0 0 ${W} ${H}`}
                style={{ width: "100%", height: "auto", maxHeight: "280px" }}
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={lineColor} stopOpacity="0.02" />
                    </linearGradient>
                </defs>

                {/* Grid lines */}
                {yLabels.map((tick, i) => (
                    <g key={i}>
                        <line
                            x1={PAD_X}
                            y1={tick.y}
                            x2={W - PAD_X}
                            y2={tick.y}
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="1"
                        />
                        <text x={PAD_X - 8} y={tick.y + 4} textAnchor="end" fill="var(--text-muted)" fontSize="10" fontFamily="Inter, sans-serif">
                            {tick.label}
                        </text>
                    </g>
                ))}

                {/* X labels */}
                {xLabels.map((tick, i) => (
                    <text key={i} x={tick.x} y={H - 6} textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontFamily="Inter, sans-serif">
                        {tick.label}
                    </text>
                ))}

                {/* Fill area */}
                <polygon points={fillPoints} fill="url(#curveGradient)" />

                {/* Line */}
                <polyline
                    points={points}
                    fill="none"
                    stroke={lineColor}
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />

                {/* Start dot */}
                <circle cx={toX(0)} cy={toY(balances[0])} r="3" fill={lineColor} />
                {/* End dot */}
                <circle cx={toX(balances.length - 1)} cy={toY(balances[balances.length - 1])} r="4" fill={lineColor} />
                <circle cx={toX(balances.length - 1)} cy={toY(balances[balances.length - 1])} r="7" fill={lineColor} opacity="0.25" />
            </svg>
        </div>
    );
}

/* ═══════════════════════════════════════════
   Stat Card
   ═══════════════════════════════════════════ */

function StatCard({ icon: Icon, label, value, color, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
            style={{
                padding: "20px",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-glass)",
                border: "1px solid var(--border-subtle)",
                backdropFilter: "blur(12px)",
                flex: "1 1 140px",
                minWidth: "140px",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div
                    style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: `${color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon size={16} style={{ color }} />
                </div>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {label}
                </span>
            </div>
            <p
                style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    color,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                }}
            >
                {value}
            </p>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════
   Number Input
   ═══════════════════════════════════════════ */

function InputField({ label, value, onChange, min, max, step, suffix, prefix }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {label}
            </label>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    transition: "border-color var(--duration-fast) ease",
                }}
            >
                {prefix && <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 500 }}>{prefix}</span>}
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    min={min}
                    max={max}
                    step={step || 1}
                    style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "var(--text-primary)",
                        fontSize: "14px",
                        fontWeight: 600,
                        fontFamily: "inherit",
                        width: "100%",
                    }}
                />
                {suffix && <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>{suffix}</span>}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════ */

export default function CalculatorPage() {
    // Inputs
    const [startingBalance, setStartingBalance] = useState(1000);
    const [winRate, setWinRate] = useState(55);
    const [takeProfit, setTakeProfit] = useState(5);
    const [stopLoss, setStopLoss] = useState(3);
    const [numTrades, setNumTrades] = useState(50);
    const [leverage, setLeverage] = useState(1);
    const [entryFee, setEntryFee] = useState(0.1);
    const [exitFee, setExitFee] = useState(0.1);

    // Results
    const [result, setResult] = useState(null);
    const [simCount, setSimCount] = useState(0);
    const [showTable, setShowTable] = useState(false);
    const [showGuide, setShowGuide] = useState(false);

    const handleCalculate = useCallback(() => {
        const sim = runSimulation({
            startingBalance,
            winRate,
            takeProfit,
            stopLoss,
            numTrades,
            leverage,
            entryFee,
            exitFee,
        });
        setResult(sim);
        setSimCount((c) => c + 1);
        setShowTable(false);
    }, [startingBalance, winRate, takeProfit, stopLoss, numTrades, leverage, entryFee, exitFee]);

    const handleReset = () => {
        setStartingBalance(1000);
        setWinRate(55);
        setTakeProfit(5);
        setStopLoss(3);
        setNumTrades(50);
        setLeverage(1);
        setEntryFee(0.1);
        setExitFee(0.1);
        setResult(null);
        setSimCount(0);
    };

    const fmt = (n) => {
        if (Math.abs(n) >= 1000) return (n >= 0 ? "+" : "") + "$" + Math.abs(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return (n >= 0 ? "+" : "-") + "$" + Math.abs(n).toFixed(2);
    };

    const fmtDollar = (n) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div style={{ display: "flex", minHeight: "100vh", position: "relative" }}>
            <Sidebar />

            <main
                style={{
                    flex: 1,
                    padding: "32px 40px",
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "1100px",
                }}
            >
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        marginBottom: "32px",
                        flexWrap: "wrap",
                        gap: "16px",
                    }}
                >
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                            <Calculator size={20} style={{ color: "var(--primary)" }} />
                            <h2
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: "24px",
                                    fontWeight: 700,
                                    color: "var(--text-primary)",
                                    letterSpacing: "-0.03em",
                                }}
                            >
                                Profit Calculator
                            </h2>
                        </div>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 400 }}>
                            Monte Carlo simulation — test your strategy before risking real capital
                        </p>
                    </div>

                    {simCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "6px 12px",
                                borderRadius: "var(--radius-sm)",
                                background: "var(--secondary-glow)",
                                fontSize: "11px",
                                fontWeight: 600,
                                color: "var(--secondary)",
                            }}
                        >
                            <Sparkles size={12} />
                            {simCount} simulation{simCount > 1 ? "s" : ""} run
                        </motion.div>
                    )}
                </motion.header>

                {/* How to Use Guide */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: "16px" }}
                >
                    <motion.button
                        onClick={() => setShowGuide(!showGuide)}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                        style={{
                            width: "100%",
                            padding: "12px 18px",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid var(--border-subtle)",
                            background: showGuide ? "var(--bg-glass)" : "transparent",
                            color: "var(--text-muted)",
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <HelpCircle size={14} style={{ color: "var(--secondary)" }} />
                            How to Use This Calculator
                        </span>
                        {showGuide ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </motion.button>

                    <AnimatePresence>
                        {showGuide && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                style={{ overflow: "hidden" }}
                            >
                                <div
                                    style={{
                                        padding: "20px 22px",
                                        marginTop: "8px",
                                        borderRadius: "var(--radius-md)",
                                        background: "var(--bg-glass)",
                                        border: "1px solid var(--border-subtle)",
                                        backdropFilter: "blur(12px)",
                                    }}
                                >
                                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "16px" }}>
                                        This tool uses a <strong style={{ color: "var(--text-primary)" }}>Monte Carlo simulation</strong> to test
                                        how a trading strategy might perform over a series of trades. Each click of &ldquo;Calculate&rdquo; produces
                                        a unique, randomised sequence — run it multiple times to see the range of possible outcomes.
                                    </p>

                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                                        gap: "12px",
                                    }}>
                                        {[
                                            { title: "Starting Balance", desc: "Your initial account size in USD. All profits compound on this amount." },
                                            { title: "Win Rate", desc: "The % chance each trade is a winner. 55% means roughly 55 out of 100 trades win." },
                                            { title: "Take Profit", desc: "How much you gain on a winning trade, as a % of your position size." },
                                            { title: "Stop Loss", desc: "How much you lose on a losing trade, as a % of your position size." },
                                            { title: "Number of Trades", desc: "Total trades to simulate. More trades = clearer picture of your edge over time." },
                                            { title: "Leverage", desc: "Multiplier on your balance per trade. 2x means your position is twice your balance." },
                                            { title: "Entry / Exit Fees", desc: "Broker fees charged on the full (leveraged) position when opening and closing." },
                                        ].map((item) => (
                                            <div
                                                key={item.title}
                                                style={{
                                                    padding: "12px 14px",
                                                    borderRadius: "var(--radius-sm)",
                                                    background: "var(--bg-elevated)",
                                                    border: "1px solid var(--border-subtle)",
                                                }}
                                            >
                                                <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--secondary)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                                                    {item.title}
                                                </p>
                                                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                                                    {item.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{
                                        marginTop: "16px",
                                        padding: "12px 14px",
                                        borderRadius: "var(--radius-sm)",
                                        background: "rgba(255, 109, 90, 0.06)",
                                        border: "1px solid rgba(255, 109, 90, 0.15)",
                                    }}>
                                        <p style={{ fontSize: "11px", color: "var(--primary)", fontWeight: 600, marginBottom: "4px" }}>⚠ Disclaimer</p>
                                        <p style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                                            This is a simulation tool for educational purposes only. Real trading involves slippage, spread,
                                            market gaps, and emotional factors not accounted for here. Past performance does not guarantee future results.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Parameter Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        padding: "24px",
                        borderRadius: "var(--radius-lg)",
                        background: "var(--bg-glass)",
                        border: "1px solid var(--border-subtle)",
                        backdropFilter: "blur(20px)",
                        marginBottom: "24px",
                    }}
                >
                    <p
                        style={{
                            fontSize: "10px",
                            fontWeight: 600,
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            marginBottom: "16px",
                        }}
                    >
                        Parameters
                    </p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                            gap: "16px",
                            marginBottom: "20px",
                        }}
                    >
                        <InputField label="Starting Balance" value={startingBalance} onChange={setStartingBalance} min={100} max={1000000} prefix="$" />
                        <InputField label="Win Rate" value={winRate} onChange={setWinRate} min={1} max={99} suffix="%" />
                        <InputField label="Take Profit" value={takeProfit} onChange={setTakeProfit} min={0.1} max={100} step={0.1} suffix="%" />
                        <InputField label="Stop Loss" value={stopLoss} onChange={setStopLoss} min={0.1} max={100} step={0.1} suffix="%" />
                        <InputField label="Number of Trades" value={numTrades} onChange={setNumTrades} min={1} max={500} />
                        <InputField label="Leverage" value={leverage} onChange={setLeverage} min={1} max={200} suffix="x" />
                        <InputField label="Entry Fee" value={entryFee} onChange={setEntryFee} min={0} max={5} step={0.01} suffix="%" />
                        <InputField label="Exit Fee" value={exitFee} onChange={setExitFee} min={0} max={5} step={0.01} suffix="%" />
                    </div>

                    {/* Buttons */}
                    <div style={{ display: "flex", gap: "12px" }}>
                        <motion.button
                            onClick={handleCalculate}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                padding: "12px 32px",
                                borderRadius: "var(--radius-sm)",
                                border: "none",
                                background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                                color: "#fff",
                                fontSize: "14px",
                                fontWeight: 700,
                                cursor: "pointer",
                                fontFamily: "inherit",
                                boxShadow: "0 4px 20px rgba(255, 109, 90, 0.3)",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            Calculate
                        </motion.button>
                        <motion.button
                            onClick={handleReset}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                padding: "12px 20px",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid var(--border-subtle)",
                                background: "var(--bg-glass)",
                                color: "var(--text-secondary)",
                                fontSize: "13px",
                                fontWeight: 500,
                                cursor: "pointer",
                                fontFamily: "inherit",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                            }}
                        >
                            <RotateCcw size={14} /> Reset
                        </motion.button>
                    </div>
                </motion.div>

                {/* Results */}
                <AnimatePresence mode="wait">
                    {result && (
                        <motion.div
                            key={simCount}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Stat Cards */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: "12px",
                                    marginBottom: "24px",
                                    flexWrap: "wrap",
                                }}
                            >
                                <StatCard
                                    icon={DollarSign}
                                    label="Net Profit"
                                    value={fmt(result.stats.netProfit)}
                                    color={result.stats.netProfit >= 0 ? "var(--accent-green)" : "var(--primary)"}
                                    delay={0}
                                />
                                <StatCard
                                    icon={Target}
                                    label="Final Balance"
                                    value={fmtDollar(result.stats.finalBalance)}
                                    color="var(--secondary)"
                                    delay={0.05}
                                />
                                <StatCard
                                    icon={TrendingUp}
                                    label={`Wins: ${result.stats.wins}`}
                                    value={`${result.stats.losses} Losses`}
                                    color="var(--accent-amber)"
                                    delay={0.1}
                                />
                                <StatCard
                                    icon={Target}
                                    label="R:R Ratio"
                                    value={`${result.stats.riskReward}:1`}
                                    color="var(--text-primary)"
                                    delay={0.15}
                                />
                            </div>

                            {/* Secondary Stats Row */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: "24px",
                                    marginBottom: "24px",
                                    padding: "16px 20px",
                                    borderRadius: "var(--radius-md)",
                                    background: "var(--bg-glass)",
                                    border: "1px solid var(--border-subtle)",
                                    flexWrap: "wrap",
                                }}
                            >
                                <div style={{ fontSize: "12px" }}>
                                    <span style={{ color: "var(--text-muted)" }}>Return: </span>
                                    <span style={{ fontWeight: 700, color: result.stats.returnPct >= 0 ? "var(--accent-green)" : "var(--primary)" }}>
                                        {result.stats.returnPct >= 0 ? "+" : ""}{result.stats.returnPct}%
                                    </span>
                                </div>
                                <div style={{ fontSize: "12px" }}>
                                    <span style={{ color: "var(--text-muted)" }}>Max Drawdown: </span>
                                    <span style={{ fontWeight: 700, color: "var(--primary)" }}>
                                        {result.stats.maxDrawdown}%
                                    </span>
                                </div>
                                <div style={{ fontSize: "12px" }}>
                                    <span style={{ color: "var(--text-muted)" }}>Expectancy: </span>
                                    <span style={{ fontWeight: 700, color: result.stats.expectancy >= 0 ? "var(--accent-green)" : "var(--primary)" }}>
                                        {result.stats.expectancy >= 0 ? "+" : ""}{result.stats.expectancy}%
                                    </span>
                                </div>
                                <div style={{ fontSize: "12px" }}>
                                    <span style={{ color: "var(--text-muted)" }}>Win Rate: </span>
                                    <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                                        {result.history.length > 0 ? Math.round((result.stats.wins / result.history.length) * 100) : 0}%
                                    </span>
                                </div>
                            </div>

                            {/* Equity Curve */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                style={{
                                    padding: "24px",
                                    borderRadius: "var(--radius-lg)",
                                    background: "var(--bg-glass)",
                                    border: "1px solid var(--border-subtle)",
                                    marginBottom: "24px",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "10px",
                                        fontWeight: 600,
                                        color: "var(--text-muted)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                        marginBottom: "16px",
                                    }}
                                >
                                    Equity Curve
                                </p>
                                <EquityCurve history={result.history} startingBalance={startingBalance} />
                            </motion.div>

                            {/* Trade History Toggle */}
                            <motion.button
                                onClick={() => setShowTable(!showTable)}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                style={{
                                    width: "100%",
                                    padding: "14px 20px",
                                    borderRadius: "var(--radius-md)",
                                    border: "1px solid var(--border-subtle)",
                                    background: "var(--bg-glass)",
                                    color: "var(--text-secondary)",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    fontFamily: "inherit",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: showTable ? "12px" : "0",
                                }}
                            >
                                <span>Trade History ({result.history.length} trades)</span>
                                {showTable ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </motion.button>

                            {/* Trade History Table */}
                            <AnimatePresence>
                                {showTable && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        style={{
                                            borderRadius: "var(--radius-md)",
                                            border: "1px solid var(--border-subtle)",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                                            <table
                                                style={{
                                                    width: "100%",
                                                    borderCollapse: "collapse",
                                                    fontSize: "12px",
                                                    fontFamily: "inherit",
                                                }}
                                            >
                                                <thead>
                                                    <tr
                                                        style={{
                                                            background: "var(--bg-elevated)",
                                                            position: "sticky",
                                                            top: 0,
                                                            zIndex: 2,
                                                        }}
                                                    >
                                                        {["#", "Result", "Balance", "Position Size", "Exit Value", "P/L"].map((h) => (
                                                            <th
                                                                key={h}
                                                                style={{
                                                                    padding: "12px 16px",
                                                                    textAlign: "left",
                                                                    fontWeight: 600,
                                                                    color: "var(--text-muted)",
                                                                    textTransform: "uppercase",
                                                                    letterSpacing: "0.05em",
                                                                    fontSize: "10px",
                                                                    borderBottom: "1px solid var(--border-subtle)",
                                                                }}
                                                            >
                                                                {h}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {result.history.map((trade) => (
                                                        <tr
                                                            key={trade.trade}
                                                            style={{
                                                                borderBottom: "1px solid var(--border-subtle)",
                                                                background: trade.result === "Win"
                                                                    ? "rgba(16, 185, 129, 0.03)"
                                                                    : "rgba(255, 109, 90, 0.03)",
                                                                transition: "background var(--duration-fast) ease",
                                                            }}
                                                        >
                                                            <td style={{ padding: "10px 16px", color: "var(--text-muted)", fontWeight: 500 }}>
                                                                {trade.trade}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    padding: "10px 16px",
                                                                    fontWeight: 700,
                                                                    color: trade.result === "Win" ? "var(--accent-green)" : "var(--primary)",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: "4px",
                                                                }}
                                                            >
                                                                {trade.result === "Win" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                                                {trade.result}
                                                            </td>
                                                            <td style={{ padding: "10px 16px", color: "var(--text-primary)", fontWeight: 600 }}>
                                                                {fmtDollar(trade.balance)}
                                                            </td>
                                                            <td style={{ padding: "10px 16px", color: "var(--text-secondary)" }}>
                                                                {fmtDollar(trade.entrySize)}
                                                            </td>
                                                            <td style={{ padding: "10px 16px", color: "var(--text-secondary)" }}>
                                                                {fmtDollar(trade.exitSize)}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    padding: "10px 16px",
                                                                    fontWeight: 700,
                                                                    color: trade.pnl >= 0 ? "var(--accent-green)" : "var(--primary)",
                                                                }}
                                                            >
                                                                {trade.pnl >= 0 ? "+" : ""}{fmtDollar(Math.abs(trade.pnl))}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Empty state — before first calculation */}
                {!result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "16px",
                            padding: "60px 40px",
                            borderRadius: "var(--radius-lg)",
                            background: "var(--bg-glass)",
                            border: "1px solid var(--border-subtle)",
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "50%",
                                background: "var(--secondary-glow)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Calculator size={24} style={{ color: "var(--secondary)" }} />
                        </div>
                        <h3
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: "18px",
                                fontWeight: 600,
                                color: "var(--text-primary)",
                            }}
                        >
                            Configure &amp; Simulate
                        </h3>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)", maxWidth: "360px", lineHeight: 1.6 }}>
                            Set your strategy parameters above and hit Calculate to run a random
                            simulation. Each run produces a unique outcome — test your edge.
                        </p>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
