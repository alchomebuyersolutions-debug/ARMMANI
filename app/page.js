"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Power,
  BarChart2,
  Lock,
  Newspaper,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Send,
  Youtube,
  Twitter,
  MessageCircle,
  Instagram,
  Twitch,
  Facebook,
  Linkedin,
  Globe,
  Webhook,
  Music
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

// Mock Data for News
const NEWS_ITEMS = [
  { id: 1, source: "Bloomberg", title: "Federal Reserve indicates potential rate cuts by Q3 as inflation cools", time: "10m ago" },
  { id: 2, source: "Reuters", title: "Tech stocks rally as quarterly earnings beat expectations across the board", time: "1h ago" },
  { id: 3, source: "CNBC", title: "Global markets stabilize after recent forex volatility", time: "2h ago" },
];

export default function Home() {
  const [_mt5Connected, _setMt5Connected] = useState(false);
  const [_blofinConnected, _setBlofinConnected] = useState(false);
  const [_webhookConnected, _setWebhookConnected] = useState(false);
  const [_gravityClawActive, _setGravityClawActive] = useState(false);
  const [gravityClawLoading, setGravityClawLoading] = useState(false);
  const [telegramBotActive, setTelegramBotActive] = useState(false);
  const [_alphaWikDeployed, _setAlphaWikDeployed] = useState(false);
  const [_alphaBitConfigured, _setAlphaBitConfigured] = useState(false);

  // Social Media State
  const [_youtubeConnected, _setYoutubeConnected] = useState(false);
  const [_twitterConnected, _setTwitterConnected] = useState(false);
  const [_discordConnected, _setDiscordConnected] = useState(false);
  const [_telegramConnected, _setTelegramConnected] = useState(false);
  const [_redditConnected, _setRedditConnected] = useState(false);
  const [_instagramConnected, _setInstagramConnected] = useState(false);
  const [_twitchConnected, _setTwitchConnected] = useState(false);
  const [_metaConnected, _setMetaConnected] = useState(false);
  const [_tiktokConnected, _setTiktokConnected] = useState(false);
  const [_customWebhookConnected, _setCustomWebhookConnected] = useState(false);

  // Check Gravity Claw bot status on load
  useEffect(() => {
    fetch("/api/gravity-claw")
      .then(res => res.json())
      .then(data => { _setGravityClawActive(data.running); })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("/api/integrations")
      .then(res => res.json())
      .then(data => {
        if (data.mt5) _setMt5Connected(true);
        if (data.blofin) _setBlofinConnected(true);
        if (data.youtube) _setYoutubeConnected(true);
        if (data.twitter) _setTwitterConnected(true);
        if (data.discord) _setDiscordConnected(true);
        if (data.telegram) _setTelegramConnected(true);
        if (data.reddit) _setRedditConnected(true);
        if (data.instagram) _setInstagramConnected(true);
        if (data.twitch) _setTwitchConnected(true);
        if (data.meta) _setMetaConnected(true);
        if (data.tiktok) _setTiktokConnected(true);
        if (data.customWebhook) _setCustomWebhookConnected(true);
      })
      .catch(console.error);
  }, []);

  const syncIntegration = async (platform, connected) => {
    try {
      await fetch("/api/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, connected })
      });
    } catch (error) {
      console.error("Failed to sync integration state:", error);
    }
  };

  // Wrapped setters and state variables to automatically sync when updated by onClick handlers
  const mt5Connected = _mt5Connected;
  const setMt5Connected = (v) => { _setMt5Connected(v); syncIntegration('mt5', v); };

  const blofinConnected = _blofinConnected;
  const setBlofinConnected = (v) => { _setBlofinConnected(v); syncIntegration('blofin', v); };

  const youtubeConnected = _youtubeConnected;
  const setYoutubeConnected = (v) => { _setYoutubeConnected(v); syncIntegration('youtube', v); };

  const twitterConnected = _twitterConnected;
  const setTwitterConnected = (v) => { _setTwitterConnected(v); syncIntegration('twitter', v); };

  const discordConnected = _discordConnected;
  const setDiscordConnected = (v) => { _setDiscordConnected(v); syncIntegration('discord', v); };

  const telegramConnected = _telegramConnected;
  const setTelegramConnected = (v) => { _setTelegramConnected(v); syncIntegration('telegram', v); };

  const redditConnected = _redditConnected;
  const setRedditConnected = (v) => { _setRedditConnected(v); syncIntegration('reddit', v); };

  const instagramConnected = _instagramConnected;
  const setInstagramConnected = (v) => { _setInstagramConnected(v); syncIntegration('instagram', v); };

  const twitchConnected = _twitchConnected;
  const setTwitchConnected = (v) => { _setTwitchConnected(v); syncIntegration('twitch', v); };

  const metaConnected = _metaConnected;
  const setMetaConnected = (v) => { _setMetaConnected(v); syncIntegration('meta', v); };

  const tiktokConnected = _tiktokConnected;
  const setTiktokConnected = (v) => { _setTiktokConnected(v); syncIntegration('tiktok', v); };

  const customWebhookConnected = _customWebhookConnected;
  const setCustomWebhookConnected = (v) => { _setCustomWebhookConnected(v); syncIntegration('customWebhook', v); };

  const webhookConnected = _webhookConnected;
  const setWebhookConnected = (v) => { _setWebhookConnected(v); syncIntegration('webhook', v); };

  const gravityClawActive = _gravityClawActive;
  const toggleGravityClaw = async () => {
    setGravityClawLoading(true);
    try {
      const action = gravityClawActive ? "stop" : "start";
      const res = await fetch("/api/gravity-claw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      _setGravityClawActive(data.running);
    } catch (error) {
      console.error("Failed to toggle Gravity Claw:", error);
    } finally {
      setGravityClawLoading(false);
    }
  };

  const alphaWikDeployed = _alphaWikDeployed;
  const setAlphaWikDeployed = (v) => { _setAlphaWikDeployed(v); syncIntegration('alphaWik', v); };

  const alphaBitConfigured = _alphaBitConfigured;
  const setAlphaBitConfigured = (v) => { _setAlphaBitConfigured(v); syncIntegration('alphaBit', v); };

  const allBotsActive = gravityClawActive && alphaWikDeployed && alphaBitConfigured && telegramBotActive;

  const launchAllBots = async () => {
    setGravityClawLoading(true);
    try {
      if (!gravityClawActive) {
        const res = await fetch("/api/gravity-claw", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "start" }) });
        const data = await res.json();
        _setGravityClawActive(data.running);
      }
    } catch (e) { console.error(e); } finally { setGravityClawLoading(false); }
    setAlphaWikDeployed(true);
    setAlphaBitConfigured(true);
    setTelegramBotActive(true);
  };

  const killAllBots = async () => {
    setGravityClawLoading(true);
    try {
      const res = await fetch("/api/gravity-claw", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "stop" }) });
      const data = await res.json();
      _setGravityClawActive(data.running);
    } catch (e) { console.error(e); } finally { setGravityClawLoading(false); }
    setAlphaWikDeployed(false);
    setAlphaBitConfigured(false);
    setTelegramBotActive(false);
  };

  // Gravity Chat state
  const [gravityChatMessage, setGravityChatMessage] = useState("");
  const [gravityChatHistory, setGravityChatHistory] = useState([
    { role: 'system', content: 'Gravity Claw initialized. Awaiting commands.' }
  ]);

  const handleGravitySendMessage = (e) => {
    e.preventDefault();
    if (!gravityChatMessage.trim()) return;

    // Add user message to history
    const newMessage = { role: 'user', content: gravityChatMessage };
    setGravityChatHistory(prev => [...prev, newMessage]);
    setGravityChatMessage("");

    // Mock bot response
    setTimeout(() => {
      setGravityChatHistory(prev => [...prev, { role: 'system', content: `Acknowledged: "${newMessage.content}". Processing command...` }]);
    }, 600);
  };

  // Alpha Wik Chat state
  const [alphaChatMessage, setAlphaChatMessage] = useState("");
  const [alphaChatHistory, setAlphaChatHistory] = useState([
    { role: 'system', content: 'Alpha Wik initialized. Standing by for market directives.' }
  ]);

  const handleAlphaSendMessage = (e) => {
    e.preventDefault();
    if (!alphaChatMessage.trim()) return;

    const newMessage = { role: 'user', content: alphaChatMessage };
    setAlphaChatHistory(prev => [...prev, newMessage]);
    setAlphaChatMessage("");

    setTimeout(() => {
      setAlphaChatHistory(prev => [...prev, { role: 'system', content: `Market directive received: "${newMessage.content}". Assessing conditions...` }]);
    }, 600);
  };
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--bg-main)"
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.6, display: "flex", justifyContent: "flex-end" }}>
        <Spotlight className="-top-40 left-0 md:left-20 md:-top-20" fill="white" />
        <div style={{ width: "60%", maxWidth: "800px", height: "100%", transform: "translateX(10%)" }}>
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      <Sidebar />

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "32px 40px",
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "32px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <Activity size={24} style={{ color: "var(--primary)" }} />
            <h1 style={{ fontSize: "28px", fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
              Trading Command Center
            </h1>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", fontWeight: 400 }}>
            Manage MT5 connections, algorithmic bots, and real-time market data.
          </p>
        </motion.header>

        {/* ===== BOTS COMMAND BAR ===== */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginBottom: "28px",
            background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(16,185,129,0.06) 100%)",
            border: "1px solid rgba(16,185,129,0.25)",
            borderRadius: "var(--radius-lg)",
            padding: "20px 28px",
            backdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
            boxShadow: allBotsActive ? "0 0 40px rgba(16,185,129,0.12), inset 0 1px 0 rgba(16,185,129,0.15)" : "0 0 0 rgba(0,0,0,0)",
            transition: "box-shadow 0.4s ease"
          }}
        >
          {/* Left: Label + individual bots */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginRight: "8px" }}>
              <Power size={16} style={{ color: allBotsActive ? "#10b981" : "var(--text-muted)" }} />
              <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: allBotsActive ? "#10b981" : "var(--text-muted)" }}>BOT FLEET</span>
            </div>

            {/* Gravity Claw pill */}
            {[{
              name: "Gravity Claw", active: gravityClawActive,
              onToggle: () => {
                setGravityClawLoading(true);
                fetch("/api/gravity-claw", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: gravityClawActive ? "stop" : "start" }) })
                  .then(r => r.json()).then(d => _setGravityClawActive(d.running)).catch(console.error).finally(() => setGravityClawLoading(false));
              }, color: "#10b981"
            }, {
              name: "Alpha Wik", active: alphaWikDeployed,
              onToggle: () => setAlphaWikDeployed(!alphaWikDeployed), color: "#a78bfa"
            }, {
              name: "Alpha Bit", active: alphaBitConfigured,
              onToggle: () => setAlphaBitConfigured(!alphaBitConfigured), color: "#3b82f6"
            }, {
              name: "Telegram Bot", active: telegramBotActive,
              onToggle: () => setTelegramBotActive(!telegramBotActive), color: "#0088cc"
            }].map(bot => (
              <motion.button
                key={bot.name}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={bot.onToggle}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: bot.active ? `rgba(${bot.color === "#10b981" ? "16,185,129" : bot.color === "#a78bfa" ? "167,139,250" : bot.color === "#3b82f6" ? "59,130,246" : "0,136,204"},0.12)` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${bot.active ? bot.color + "55" : "var(--border-subtle)"}`,
                  borderRadius: "24px", padding: "7px 16px",
                  cursor: "pointer", fontFamily: "inherit", fontSize: "12px", fontWeight: 600,
                  color: bot.active ? bot.color : "var(--text-muted)",
                  transition: "all 0.2s ease"
                }}
              >
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: bot.active ? bot.color : "transparent", border: bot.active ? "none" : "1px solid var(--text-muted)", boxShadow: bot.active ? `0 0 8px ${bot.color}` : "none", transition: "all 0.3s ease" }} />
                {bot.name}
              </motion.button>
            ))}
          </div>

          {/* Right: Master Launch Button */}
          <motion.button
            id="launch-all-bots-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={allBotsActive ? killAllBots : launchAllBots}
            disabled={gravityClawLoading}
            style={{
              background: allBotsActive
                ? "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))"
                : "linear-gradient(135deg, #10b981, #059669)",
              border: allBotsActive ? "1px solid rgba(239,68,68,0.4)" : "none",
              color: "white",
              padding: "11px 28px",
              borderRadius: "var(--radius-sm)",
              fontWeight: 700,
              fontSize: "13px",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "0.04em",
              cursor: gravityClawLoading ? "wait" : "pointer",
              opacity: gravityClawLoading ? 0.7 : 1,
              boxShadow: allBotsActive ? "none" : "0 4px 20px rgba(16,185,129,0.35)",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease"
            }}
          >
            {gravityClawLoading ? "⏳ Please wait..." : allBotsActive ? "⛔ KILL ALL BOTS" : "🚀 LAUNCH ALL BOTS"}
          </motion.button>
        </motion.div>

        {/* Bento Grid Layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "24px",
        }}>

          {/* MT5 Sign In / Status (Span 4) */}
          {/* Exchange Integrations (Span 4) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              gridColumn: "span 12",
              background: "var(--bg-glass)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              gap: "24px"
            }}
            className="md:col-span-4"
          >
            {/* MT5 Authentication */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Lock size={18} style={{ color: "var(--secondary)" }} />
                  <h2 style={{ fontWeight: 600, fontFamily: "'Outfit', sans-serif", color: "var(--text-primary)" }}>MT5 Authentication</h2>
                </div>
                {mt5Connected ? (
                  <span style={{ fontSize: "12px", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", padding: "4px 8px", borderRadius: "20px", display: "flex", gap: "4px", alignItems: "center" }}>
                    <CheckCircle2 size={12} /> Connected
                  </span>
                ) : (
                  <span style={{ fontSize: "12px", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", padding: "4px 8px", borderRadius: "20px", display: "flex", gap: "4px", alignItems: "center" }}>
                    <AlertTriangle size={12} /> Disconnected
                  </span>
                )}
              </div>

              <AnimatePresence mode="wait">
                {!mt5Connected ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                  >
                    <input type="text" placeholder="Broker Login ID" style={{ padding: "12px", borderRadius: "var(--radius-sm)", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-subtle)", color: "white", outline: "none", fontFamily: "inherit", fontSize: "13px" }} />
                    <input type="password" placeholder="Password" style={{ padding: "12px", borderRadius: "var(--radius-sm)", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-subtle)", color: "white", outline: "none", fontFamily: "inherit", fontSize: "13px" }} />
                    <input type="text" placeholder="Server " style={{ padding: "12px", borderRadius: "var(--radius-sm)", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-subtle)", color: "white", outline: "none", fontFamily: "inherit", fontSize: "13px" }} />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setMt5Connected(true)}
                      style={{ marginTop: "8px", background: "linear-gradient(135deg, var(--primary), var(--secondary))", color: "white", padding: "12px", borderRadius: "var(--radius-sm)", fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                      Connect to MT5
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="status"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "12px" }}>
                      <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>Balance</span>
                      <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>$124,500.00</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "12px" }}>
                      <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>Equity</span>
                      <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>$125,230.45</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>Margin Free</span>
                      <span style={{ fontWeight: 600, color: "var(--accent-green)" }}>$110,000.00</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setMt5Connected(false)}
                      style={{ marginTop: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", color: "white", padding: "10px", borderRadius: "var(--radius-sm)", fontSize: "13px", cursor: "pointer", fontFamily: "inherit" }}>
                      Disconnect MT5
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Separator */}
            <div style={{ height: "1px", background: "var(--border-subtle)", width: "100%" }} />

            {/* Blofin Authentication */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Lock size={18} style={{ color: "var(--primary)" }} />
                  <h2 style={{ fontWeight: 600, fontFamily: "'Outfit', sans-serif", color: "var(--text-primary)" }}>Blofin API</h2>
                </div>
                {blofinConnected ? (
                  <span style={{ fontSize: "12px", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", padding: "4px 8px", borderRadius: "20px", display: "flex", gap: "4px", alignItems: "center" }}>
                    <CheckCircle2 size={12} /> Connected
                  </span>
                ) : (
                  <span style={{ fontSize: "12px", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", padding: "4px 8px", borderRadius: "20px", display: "flex", gap: "4px", alignItems: "center" }}>
                    <AlertTriangle size={12} /> Disconnected
                  </span>
                )}
              </div>

              <AnimatePresence mode="wait">
                {!blofinConnected ? (
                  <motion.div
                    key="blofin-login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                  >
                    <input type="text" placeholder="API Key" style={{ padding: "12px", borderRadius: "var(--radius-sm)", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-subtle)", color: "white", outline: "none", fontFamily: "inherit", fontSize: "13px" }} />
                    <input type="password" placeholder="API Secret" style={{ padding: "12px", borderRadius: "var(--radius-sm)", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-subtle)", color: "white", outline: "none", fontFamily: "inherit", fontSize: "13px" }} />
                    <input type="password" placeholder="Passphrase" style={{ padding: "12px", borderRadius: "var(--radius-sm)", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-subtle)", color: "white", outline: "none", fontFamily: "inherit", fontSize: "13px" }} />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setBlofinConnected(true)}
                      style={{ marginTop: "8px", background: "var(--bg-elevated)", color: "white", padding: "12px", borderRadius: "var(--radius-sm)", fontWeight: 600, border: "1px solid var(--border-subtle)", cursor: "pointer", fontFamily: "inherit" }}>
                      Bind Blofin Account
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="blofin-status"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>USDT Wallet</span>
                      <span style={{ fontWeight: 600, color: "var(--accent-green)" }}>$12,400.00</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setBlofinConnected(false)}
                      style={{ marginTop: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", color: "white", padding: "10px", borderRadius: "var(--radius-sm)", fontSize: "13px", cursor: "pointer", fontFamily: "inherit" }}>
                      Disconnect Blofin
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* TradewingView & Webhook Integration (Span 8) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              gridColumn: "span 12",
              display: "grid",
              gridTemplateRows: "auto 1fr",
              gap: "24px"
            }}
            className="md:col-span-8"
          >
            {/* TradingView Sign In / Link */}
            <div style={{
              background: "linear-gradient(to right, rgba(41, 98, 255, 0.1), rgba(0,0,0, 0.4))",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backdropFilter: "blur(12px)",
              flexWrap: "wrap",
              gap: "16px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ background: "rgba(41, 98, 255, 0.2)", padding: "10px", borderRadius: "12px" }}>
                  <BarChart2 style={{ color: "#2962FF" }} size={24} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: "16px", margin: "0 0 4px 0", color: "var(--text-primary)" }}>TradingView Integration</h3>
                  <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)" }}>Receive webhook alerts to trigger Alpha Wik entries.</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setWebhookConnected(!webhookConnected)}
                style={{ background: webhookConnected ? "rgba(16, 185, 129, 0.15)" : "#2962FF", border: webhookConnected ? "1px solid rgba(16, 185, 129, 0.3)" : "none", color: "white", padding: "10px 20px", borderRadius: "var(--radius-sm)", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", fontSize: "13px", boxShadow: webhookConnected ? "none" : "0 4px 14px 0 rgba(41, 98, 255, 0.39)" }}>
                {webhookConnected ? "✓ Webhook Connected" : "Connect Webhook"}
              </motion.button>
            </div>

            {/* Chart Placeholder */}
            <div style={{
              background: "var(--bg-glass)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              backdropFilter: "blur(12px)",
              overflow: "hidden",
              position: "relative",
              minHeight: "350px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "16px"
            }}>
              <BarChart2 size={48} style={{ color: "rgba(255,255,255,0.05)" }} />
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>TradingView Advanced Chart Widget</p>
              <span style={{ fontSize: "11px", color: "var(--primary)", background: "var(--primary-glow)", padding: "4px 12px", borderRadius: "20px" }}>Coming Soon</span>
              {/* In a real app, inject the TV iframe here */}
            </div>
          </motion.div>

          {/* Social Media & Content Integrations (Span 12) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{
              gridColumn: "span 12",
              background: "var(--bg-glass)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <MessageCircle size={18} style={{ color: "var(--text-secondary)" }} />
              <h2 style={{ fontWeight: 600, fontFamily: "'Outfit', sans-serif", color: "var(--text-primary)" }}>Social & Media Integrations</h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px"
            }}>
              {/* YouTube Integration */}
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ background: "rgba(255, 0, 0, 0.1)", padding: "8px", borderRadius: "8px" }}>
                      <Youtube size={20} color="#FF0000" />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>YouTube API</h3>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Data & Analytics</span>
                    </div>
                  </div>
                  {youtubeConnected ? (
                    <span style={{ fontSize: "11px", color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>Authorized</span>
                  ) : (
                    <span style={{ fontSize: "11px", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>Required</span>
                  )}
                </div>
                {!youtubeConnected ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setYoutubeConnected(true)}
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", padding: "8px", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
                  >
                    Authenticate YouTube
                  </motion.button>
                ) : (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Subscribers</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>1.2M</div>
                    </div>
                    <motion.button onClick={() => setYoutubeConnected(false)} style={{ background: "transparent", border: "1px solid var(--border-subtle)", color: "var(--text-muted)", padding: "0 12px", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "11px" }}>Revoke</motion.button>
                  </div>
                )}
              </div>

              {/* Twitter / X Integration */}
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ background: "rgba(29, 161, 242, 0.1)", padding: "8px", borderRadius: "8px" }}>
                      <Twitter size={20} color="#1DA1F2" />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>X (Twitter) API</h3>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Sentiment & Posts</span>
                    </div>
                  </div>
                  {twitterConnected ? (
                    <span style={{ fontSize: "11px", color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>Authorized</span>
                  ) : (
                    <span style={{ fontSize: "11px", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>Required</span>
                  )}
                </div>
                {!twitterConnected ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTwitterConnected(true)}
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", padding: "8px", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
                  >
                    Authenticate X (Twitter)
                  </motion.button>
                ) : (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Sentiment</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--accent-green)" }}>Bullish</div>
                    </div>
                    <motion.button onClick={() => setTwitterConnected(false)} style={{ background: "transparent", border: "1px solid var(--border-subtle)", color: "var(--text-muted)", padding: "0 12px", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "11px" }}>Revoke</motion.button>
                  </div>
                )}
              </div>

              {/* Discord Integration */}
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ background: "rgba(88, 101, 242, 0.1)", padding: "8px", borderRadius: "8px" }}>
                      <MessageCircle size={20} color="#5865F2" />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>Discord Bot</h3>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Alerts & Signals</span>
                    </div>
                  </div>
                  {discordConnected ? (
                    <span style={{ fontSize: "11px", color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>Active</span>
                  ) : (
                    <span style={{ fontSize: "11px", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>Inactive</span>
                  )}
                </div>
                {!discordConnected ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDiscordConnected(true)}
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", padding: "8px", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
                  >
                    Add Discord Webhook
                  </motion.button>
                ) : (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Signals Sent</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>42</div>
                    </div>
                    <motion.button onClick={() => setDiscordConnected(false)} style={{ background: "transparent", border: "1px solid var(--border-subtle)", color: "var(--text-muted)", padding: "0 12px", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "11px" }}>Disable</motion.button>
                  </div>
                )}
              </div>

              {/* Telegram Integration */}
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ background: "rgba(0, 136, 204, 0.1)", padding: "8px", borderRadius: "8px" }}>
                      <Send size={20} color="#0088cc" />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>Telegram Bot</h3>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Commands & Broadcasts</span>
                    </div>
                  </div>
                  {telegramConnected ? (
                    <span style={{ fontSize: "11px", color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>Active</span>
                  ) : (
                    <span style={{ fontSize: "11px", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>Inactive</span>
                  )}
                </div>
                {!telegramConnected ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTelegramConnected(true)}
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", padding: "8px", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
                  >
                    Bind Telegram Token
                  </motion.button>
                ) : (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Subscribers</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>4,189</div>
                    </div>
                    <motion.button onClick={() => setTelegramConnected(false)} style={{ background: "transparent", border: "1px solid var(--border-subtle)", color: "var(--text-muted)", padding: "0 12px", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "11px" }}>Disable</motion.button>
                  </div>
                )}
              </div>

              {/* Reddit Integration */}
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ background: "rgba(255, 69, 0, 0.1)", padding: "8px", borderRadius: "8px" }}>
                      <MessageSquare size={20} color="#FF4500" />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>Reddit API</h3>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Sentiment & Scraping</span>
                    </div>
                  </div>
                  {redditConnected ? (
                    <span style={{ fontSize: "11px", color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>Authorized</span>
                  ) : (
                    <span style={{ fontSize: "11px", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>Required</span>
                  )}
                </div>
                {!redditConnected ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRedditConnected(true)}
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", padding: "8px", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
                  >
                    Authenticate Reddit
                  </motion.button>
                ) : (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Subreddits Tracked</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>14</div>
                    </div>
                    <motion.button onClick={() => setRedditConnected(false)} style={{ background: "transparent", border: "1px solid var(--border-subtle)", color: "var(--text-muted)", padding: "0 12px", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "11px" }}>Revoke</motion.button>
                  </div>
                )}
              </div>

              {/* Meta (Facebook/WhatsApp) */}
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ background: "rgba(6, 104, 225, 0.1)", padding: "8px", borderRadius: "8px" }}>
                      <Facebook size={20} color="#0668E1" />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>Meta Dev API</h3>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>FB/WhatsApp Bot</span>
                    </div>
                  </div>
                  {metaConnected ? (
                    <span style={{ fontSize: "11px", color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>Authorized</span>
                  ) : (
                    <span style={{ fontSize: "11px", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>Required</span>
                  )}
                </div>
                {!metaConnected ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMetaConnected(true)}
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", padding: "8px", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
                  >
                    Authenticate Meta
                  </motion.button>
                ) : (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Conversations</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>892</div>
                    </div>
                    <motion.button onClick={() => setMetaConnected(false)} style={{ background: "transparent", border: "1px solid var(--border-subtle)", color: "var(--text-muted)", padding: "0 12px", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "11px" }}>Revoke</motion.button>
                  </div>
                )}
              </div>

              {/* Instagram Integration */}
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ background: "rgba(225, 48, 108, 0.1)", padding: "8px", borderRadius: "8px" }}>
                      <Instagram size={20} color="#E1306C" />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>Instagram Graph</h3>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Posts & Webhooks</span>
                    </div>
                  </div>
                  {instagramConnected ? (
                    <span style={{ fontSize: "11px", color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>Authorized</span>
                  ) : (
                    <span style={{ fontSize: "11px", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>Required</span>
                  )}
                </div>
                {!instagramConnected ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setInstagramConnected(true)}
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", padding: "8px", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
                  >
                    Authenticate Instagram
                  </motion.button>
                ) : (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Engagement</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--accent-green)" }}>+14.2%</div>
                    </div>
                    <motion.button onClick={() => setInstagramConnected(false)} style={{ background: "transparent", border: "1px solid var(--border-subtle)", color: "var(--text-muted)", padding: "0 12px", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "11px" }}>Revoke</motion.button>
                  </div>
                )}
              </div>

              {/* Twitch Integration */}
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ background: "rgba(145, 70, 255, 0.1)", padding: "8px", borderRadius: "8px" }}>
                      <Twitch size={20} color="#9146FF" />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>Twitch API</h3>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Streams & Chatbot</span>
                    </div>
                  </div>
                  {twitchConnected ? (
                    <span style={{ fontSize: "11px", color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>Authorized</span>
                  ) : (
                    <span style={{ fontSize: "11px", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>Required</span>
                  )}
                </div>
                {!twitchConnected ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTwitchConnected(true)}
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", padding: "8px", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
                  >
                    Authenticate Twitch
                  </motion.button>
                ) : (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Avg Viewers</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>4.2k</div>
                    </div>
                    <motion.button onClick={() => setTwitchConnected(false)} style={{ background: "transparent", border: "1px solid var(--border-subtle)", color: "var(--text-muted)", padding: "0 12px", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "11px" }}>Revoke</motion.button>
                  </div>
                )}
              </div>

              {/* TikTok Integration */}
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ background: "rgba(255, 0, 80, 0.1)", padding: "8px", borderRadius: "8px" }}>
                      <Music size={20} color="#ff0050" />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>TikTok API</h3>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Trends & Analytics</span>
                    </div>
                  </div>
                  {tiktokConnected ? (
                    <span style={{ fontSize: "11px", color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>Authorized</span>
                  ) : (
                    <span style={{ fontSize: "11px", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>Required</span>
                  )}
                </div>
                {!tiktokConnected ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTiktokConnected(true)}
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", padding: "8px", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
                  >
                    Authenticate TikTok
                  </motion.button>
                ) : (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Avg Views</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--accent-green)" }}>+8.4%</div>
                    </div>
                    <motion.button onClick={() => setTiktokConnected(false)} style={{ background: "transparent", border: "1px solid var(--border-subtle)", color: "var(--text-muted)", padding: "0 12px", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "11px" }}>Revoke</motion.button>
                  </div>
                )}
              </div>

              {/* Custom Webhook (Catch-All) */}
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ background: "rgba(16, 185, 129, 0.1)", padding: "8px", borderRadius: "8px" }}>
                      <Webhook size={20} color="#10b981" />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>Custom Integrations</h3>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Generic Webhooks/APIs</span>
                    </div>
                  </div>
                  {customWebhookConnected ? (
                    <span style={{ fontSize: "11px", color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "2px 8px", borderRadius: "10px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>Active (3)</span>
                  ) : (
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", background: "rgba(255, 255, 255, 0.05)", padding: "2px 8px", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>Not Setup</span>
                  )}
                </div>
                {!customWebhookConnected ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCustomWebhookConnected(true)}
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", padding: "8px", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
                  >
                    Add Custom Webhook
                  </motion.button>
                ) : (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Active Hooks</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>3/10</div>
                    </div>
                    <motion.button onClick={() => setCustomWebhookConnected(false)} style={{ background: "transparent", border: "1px solid var(--border-subtle)", color: "var(--text-muted)", padding: "0 12px", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "11px" }}>Manage</motion.button>
                  </div>
                )}
              </div>

            </div>
          </motion.div>

          {/* Bot Controls (Span 6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              gridColumn: "span 12",
              background: "var(--bg-glass)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              backdropFilter: "blur(12px)",
            }}
            className="md:col-span-6"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <Power size={18} style={{ color: "var(--primary)" }} />
              <h2 style={{ fontWeight: 600, fontFamily: "'Outfit', sans-serif", color: "var(--text-primary)" }}>Algorithm Controls</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.3)", padding: "16px 20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                <div>
                  <h4 style={{ margin: "0 0 6px 0", color: "var(--text-primary)", fontSize: "15px" }}>Gravity Claw</h4>
                  <span style={{ fontSize: "12px", color: gravityClawActive ? "var(--accent-green)" : "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: gravityClawActive ? "var(--accent-green)" : "transparent", border: gravityClawActive ? "none" : "1px solid var(--text-muted)", boxShadow: gravityClawActive ? "0 0 8px var(--accent-green)" : "none" }}></span>
                    {gravityClawActive ? "Active (EUR/USD)" : "Offline"}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleGravityClaw}
                  disabled={gravityClawLoading}
                  style={{ background: gravityClawActive ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)", color: gravityClawActive ? "#ef4444" : "#10b981", border: `1px solid ${gravityClawActive ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)"}`, padding: "8px 16px", borderRadius: "var(--radius-sm)", fontWeight: 600, cursor: gravityClawLoading ? "wait" : "pointer", fontFamily: "inherit", fontSize: "12px", opacity: gravityClawLoading ? 0.6 : 1 }}>
                  {gravityClawLoading ? "..." : gravityClawActive ? "KILL SWITCH" : "ACTIVATE"}
                </motion.button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.3)", padding: "16px 20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                <div>
                  <h4 style={{ margin: "0 0 6px 0", color: "var(--text-primary)", fontSize: "15px" }}>Alpha Wik</h4>
                  <span style={{ fontSize: "12px", color: alphaWikDeployed ? "var(--accent-green)" : "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: alphaWikDeployed ? "var(--accent-green)" : "transparent", border: alphaWikDeployed ? "none" : "1px solid var(--text-muted)", boxShadow: alphaWikDeployed ? "0 0 8px var(--accent-green)" : "none" }}></span>
                    {alphaWikDeployed ? "Deployed" : "Standby Mode"}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAlphaWikDeployed(!alphaWikDeployed)}
                  style={{ background: alphaWikDeployed ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)", color: alphaWikDeployed ? "#ef4444" : "#10b981", border: `1px solid ${alphaWikDeployed ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)"}`, padding: "8px 24px", borderRadius: "var(--radius-sm)", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", fontSize: "12px" }}>
                  {alphaWikDeployed ? "KILL SWITCH" : "DEPLOY"}
                </motion.button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.3)", padding: "16px 20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                <div>
                  <h4 style={{ margin: "0 0 6px 0", color: "var(--text-primary)", fontSize: "15px" }}>Alpha Bit</h4>
                  <span style={{ fontSize: "12px", color: alphaBitConfigured ? "var(--secondary)" : "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: alphaBitConfigured ? "var(--secondary)" : "transparent", border: alphaBitConfigured ? "none" : "1px solid var(--text-muted)", boxShadow: alphaBitConfigured ? "0 0 8px var(--secondary)" : "none" }}></span>
                    {alphaBitConfigured ? "Configured" : "Initialized"}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAlphaBitConfigured(!alphaBitConfigured)}
                  style={{ background: alphaBitConfigured ? "rgba(16, 185, 129, 0.1)" : "rgba(59, 130, 246, 0.1)", color: alphaBitConfigured ? "#10b981" : "#3b82f6", border: `1px solid ${alphaBitConfigured ? "rgba(16, 185, 129, 0.3)" : "rgba(59, 130, 246, 0.3)"}`, padding: "8px 24px", borderRadius: "var(--radius-sm)", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", fontSize: "12px" }}>
                  {alphaBitConfigured ? "DEPLOY" : "CONFIGURE"}
                </motion.button>
              </div>

              {/* Telegram Bot row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.3)", padding: "16px 20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                <div>
                  <h4 style={{ margin: "0 0 6px 0", color: "var(--text-primary)", fontSize: "15px" }}>Telegram Bot</h4>
                  <span style={{ fontSize: "12px", color: telegramBotActive ? "#0088cc" : "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: telegramBotActive ? "#0088cc" : "transparent", border: telegramBotActive ? "none" : "1px solid var(--text-muted)", boxShadow: telegramBotActive ? "0 0 8px #0088cc" : "none" }} />
                    {telegramBotActive ? "Broadcasting Signals" : "Offline"}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTelegramBotActive(!telegramBotActive)}
                  style={{ background: telegramBotActive ? "rgba(239, 68, 68, 0.1)" : "rgba(0,136,204,0.1)", color: telegramBotActive ? "#ef4444" : "#0088cc", border: `1px solid ${telegramBotActive ? "rgba(239,68,68,0.3)" : "rgba(0,136,204,0.3)"}`, padding: "8px 16px", borderRadius: "var(--radius-sm)", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", fontSize: "12px" }}
                >
                  {telegramBotActive ? "KILL SWITCH" : "ACTIVATE"}
                </motion.button>
              </div>

            </div>
          </motion.div>

          {/* Market News (Span 6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              gridColumn: "span 12",
              background: "var(--bg-glass)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              backdropFilter: "blur(12px)",
            }}
            className="md:col-span-6"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <Newspaper size={18} style={{ color: "var(--secondary)" }} />
              <h2 style={{ fontWeight: 600, fontFamily: "'Outfit', sans-serif", color: "var(--text-primary)" }}>Terminal Feed</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {NEWS_ITEMS.map((news, index) => (
                <div key={news.id} style={{ borderBottom: index === NEWS_ITEMS.length - 1 ? "none" : "1px solid var(--border-subtle)", paddingBottom: index === NEWS_ITEMS.length - 1 ? "0" : "16px" }}>
                  <span style={{ fontSize: "10px", color: "var(--primary)", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", display: "inline-block", marginBottom: "6px", background: "var(--primary-glow)", padding: "2px 8px", borderRadius: "12px" }}>
                    {news.source} • {news.time}
                  </span>
                  <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.5, color: "var(--text-primary)" }}>{news.title}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Gravity Claw Chat (Span 6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              gridColumn: "span 6",
              background: "var(--bg-glass)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "0",
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              height: "400px",
              overflow: "hidden"
            }}
            className="col-span-12 md:col-span-6"
          >
            {/* Chat Header */}
            <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.2)" }}>
              <MessageSquare size={18} style={{ color: "var(--accent-green)" }} />
              <h2 style={{ margin: 0, fontWeight: 600, fontFamily: "'Outfit', sans-serif", color: "var(--text-primary)", fontSize: "16px" }}>Gravity Claw</h2>
              <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--accent-green)", background: "rgba(16, 185, 129, 0.1)", padding: "4px 8px", borderRadius: "12px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>Online</span>
            </div>

            {/* Chat History */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {gravityChatHistory.map((msg, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: msg.role === 'user' ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "80%",
                    background: msg.role === 'user' ? "linear-gradient(135deg, var(--primary), var(--secondary))" : "rgba(0,0,0,0.5)",
                    border: msg.role === 'user' ? "none" : "1px solid var(--border-subtle)",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    borderBottomRightRadius: msg.role === 'user' ? "4px" : "12px",
                    borderBottomLeftRadius: msg.role === 'system' ? "4px" : "12px",
                    color: "white",
                    fontSize: "13px",
                    fontFamily: msg.role === 'system' ? "monospace" : "inherit"
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleGravitySendMessage} style={{ padding: "16px 24px", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "12px", background: "rgba(0,0,0,0.2)" }}>
              <input
                type="text"
                value={gravityChatMessage}
                onChange={(e) => setGravityChatMessage(e.target.value)}
                placeholder="Message Gravity Claw..."
                style={{
                  flex: 1,
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 16px",
                  color: "white",
                  outline: "none",
                  fontSize: "13px",
                  fontFamily: "inherit"
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  width: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--primary)"
                }}
              >
                <Send size={16} />
              </motion.button>
            </form>
          </motion.div>

          {/* Alpha Wik Chat (Span 6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              gridColumn: "span 6",
              background: "var(--bg-glass)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "0",
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              height: "400px",
              overflow: "hidden"
            }}
            className="col-span-12 md:col-span-6"
          >
            {/* Chat Header */}
            <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.2)" }}>
              <MessageSquare size={18} style={{ color: "var(--secondary)" }} />
              <h2 style={{ margin: 0, fontWeight: 600, fontFamily: "'Outfit', sans-serif", color: "var(--text-primary)", fontSize: "16px" }}>Alpha Wik</h2>
              <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--text-muted)", background: "rgba(255, 255, 255, 0.05)", padding: "4px 8px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>Standby</span>
            </div>

            {/* Chat History */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {alphaChatHistory.map((msg, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: msg.role === 'user' ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "80%",
                    background: msg.role === 'user' ? "linear-gradient(135deg, var(--secondary), #f59e0b)" : "rgba(0,0,0,0.5)",
                    border: msg.role === 'user' ? "none" : "1px solid var(--border-subtle)",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    borderBottomRightRadius: msg.role === 'user' ? "4px" : "12px",
                    borderBottomLeftRadius: msg.role === 'system' ? "4px" : "12px",
                    color: "white",
                    fontSize: "13px",
                    fontFamily: msg.role === 'system' ? "monospace" : "inherit"
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleAlphaSendMessage} style={{ padding: "16px 24px", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "12px", background: "rgba(0,0,0,0.2)" }}>
              <input
                type="text"
                value={alphaChatMessage}
                onChange={(e) => setAlphaChatMessage(e.target.value)}
                placeholder="Message Alpha Wik..."
                style={{
                  flex: 1,
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 16px",
                  color: "white",
                  outline: "none",
                  fontSize: "13px",
                  fontFamily: "inherit"
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  width: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--secondary)"
                }}
              >
                <Send size={16} />
              </motion.button>
            </form>
          </motion.div>

        </div>

        {/* Safe bottom padding */}
        <div style={{ height: "60px" }}></div>
      </main>
    </div>
  );
}
