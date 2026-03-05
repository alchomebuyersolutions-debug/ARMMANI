"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Cpu,
    Zap,
    ShieldAlert,
    Terminal,
    Activity,
    Plus,
    Network
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const botData = [
    {
        id: "alphawik99",
        name: "AlphaWik99",
        role: "Execution & Data Engine",
        color: "var(--accent-green)",
        borderClass: "rgba(16, 185, 129, 0.2)",
        bgClass: "rgba(16, 185, 129, 0.05)",
        attributes: [
            { name: "Execution Speed", value: 98 },
            { name: "Scraping Depth", value: 90 },
            { name: "Data Accuracy", value: 95 }
        ],
        skills: ["MT5 Trade Execution", "Market Scraping", "Sentiment Analysis"],
        canDo: [
            "Bridge to MT5 / Blofin API",
            "Scrape external web sources",
            "Extend memory via Supabase"
        ],
        cannotDo: [
            "Natural Language Conversation",
            "Process Voice Commands"
        ]
    },
    {
        id: "gravity-claw",
        name: "Gravity Claw",
        role: "Intelligence & Comms Hub",
        color: "var(--primary)",
        borderClass: "rgba(255, 109, 90, 0.2)",
        bgClass: "rgba(255, 109, 90, 0.05)",
        attributes: [
            { name: "Intelligence", value: 99 },
            { name: "Context Horizon", value: 95 },
            { name: "Comms Latency", value: 82 }
        ],
        skills: ["Language Processing", "Voice TTS/STT", "Telegram Routing"],
        canDo: [
            "Chat via Telegram natively",
            "Reason through complex market setups",
            "Transcribe voice commands to text"
        ],
        cannotDo: [
            "Execute direct TCP/IP broker trades",
            "Heavy DOM scraping tasks"
        ]
    }
];

export default function Fleet() {
    const [botStatus, setBotStatus] = useState({});
    const [botLoading, setBotLoading] = useState({});

    // Check real bot status on load
    useEffect(() => {
        fetch("/api/gravity-claw")
            .then(res => res.json())
            .then(data => setBotStatus(prev => ({ ...prev, "gravity-claw": data.running })))
            .catch(console.error);
    }, []);

    const toggleBot = async (botId) => {
        setBotLoading(prev => ({ ...prev, [botId]: true }));
        try {
            if (botId === "gravity-claw") {
                const action = botStatus[botId] ? "stop" : "start";
                const res = await fetch("/api/gravity-claw", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action }),
                });
                const data = await res.json();
                setBotStatus(prev => ({ ...prev, [botId]: data.running }));
            } else {
                // UI-only toggle for other bots
                setBotStatus(prev => ({ ...prev, [botId]: !prev[botId] }));
            }
        } catch (error) {
            console.error(`Failed to toggle ${botId}:`, error);
        } finally {
            setBotLoading(prev => ({ ...prev, [botId]: false }));
        }
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh", position: "relative" }}>
            <Sidebar />

            <main style={{ flex: 1, padding: "32px 40px", maxWidth: "1200px" }}>
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: "32px" }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <Network size={24} style={{ color: "var(--secondary)" }} />
                        <h2 style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "28px",
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            letterSpacing: "-0.03em"
                        }}>
                            Node Fleet Control
                        </h2>
                    </div>
                    <p style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 400 }}>
                        Manage the capabilities, skills, and attributes of your autonomous agent nodes.
                    </p>
                </motion.header>

                {/* Bot Cards Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "24px" }}>
                    {botData.map((bot, idx) => (
                        <motion.div
                            key={bot.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            style={{
                                background: "var(--bg-glass)",
                                border: `1px solid ${bot.borderClass}`,
                                borderRadius: "var(--radius-xl)",
                                padding: "24px",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            <div style={{
                                position: "absolute", top: 0, right: 0, width: "150px", height: "150px",
                                background: bot.bgClass, filter: "blur(50px)", zIndex: 0
                            }} />

                            <div style={{ position: "relative", zIndex: 1 }}>

                                {/* Status Header */}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                                    <div>
                                        <h3 style={{ fontSize: "24px", fontWeight: "700", fontFamily: "var(--font-display)", margin: 0 }}>{bot.name}</h3>
                                        <p style={{ fontSize: "12px", color: bot.color, textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginTop: "4px" }}>{bot.role}</p>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "var(--bg-elevated)", padding: "4px 10px", borderRadius: "12px", border: "1px solid var(--border-subtle)" }}>
                                            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: botStatus[bot.id] ? "var(--accent-green)" : "transparent", border: botStatus[bot.id] ? "none" : "1px solid var(--text-muted)", boxShadow: botStatus[bot.id] ? "0 0 10px var(--accent-green)" : "none" }} />
                                            <span style={{ fontSize: "11px", fontWeight: "600", color: botStatus[bot.id] ? "var(--text-primary)" : "var(--text-muted)" }}>{botStatus[bot.id] ? "ONLINE" : "OFFLINE"}</span>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => toggleBot(bot.id)}
                                            disabled={botLoading[bot.id]}
                                            style={{
                                                padding: "6px 14px",
                                                borderRadius: "8px",
                                                fontWeight: 600,
                                                fontSize: "11px",
                                                cursor: botLoading[bot.id] ? "wait" : "pointer",
                                                fontFamily: "inherit",
                                                opacity: botLoading[bot.id] ? 0.6 : 1,
                                                background: botStatus[bot.id] ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)",
                                                color: botStatus[bot.id] ? "#ef4444" : "#10b981",
                                                border: `1px solid ${botStatus[bot.id] ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)"}`,
                                            }}
                                        >
                                            {botLoading[bot.id] ? "..." : botStatus[bot.id] ? "KILL" : "START"}
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Attributes Progress Bars */}
                                <div style={{ marginBottom: "24px" }}>
                                    <h4 style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                                        <Activity size={14} /> Neural Attributes
                                    </h4>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        {bot.attributes.map((attr) => (
                                            <div key={attr.name}>
                                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px", fontWeight: "500" }}>
                                                    <span style={{ color: "var(--text-secondary)" }}>{attr.name}</span>
                                                    <span style={{ color: "var(--text-primary)" }}>{attr.value}%</span>
                                                </div>
                                                <div style={{ height: "4px", background: "var(--bg-elevated)", borderRadius: "4px", overflow: "hidden" }}>
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${attr.value}%` }}
                                                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                                        style={{ height: "100%", background: bot.color, boxShadow: `0 0 10px ${bot.color}` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Can / Cannot Do */}
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                                    <div style={{ background: "rgba(16, 185, 129, 0.05)", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid rgba(16, 185, 129, 0.1)" }}>
                                        <h5 style={{ fontSize: "11px", color: "var(--accent-green)", textTransform: "uppercase", marginBottom: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                                            <Zap size={12} /> Execution Capabilities
                                        </h5>
                                        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                                            {bot.canDo.map((item, i) => (
                                                <li key={i} style={{ fontSize: "12px", color: "var(--text-secondary)", display: "flex", alignItems: "flex-start", gap: "6px" }}>
                                                    <span style={{ color: "var(--accent-green)", marginTop: "2px" }}>✓</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div style={{ background: "rgba(255, 109, 90, 0.05)", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid rgba(255, 109, 90, 0.1)" }}>
                                        <h5 style={{ fontSize: "11px", color: "var(--primary)", textTransform: "uppercase", marginBottom: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                                            <ShieldAlert size={12} /> Hard Limits
                                        </h5>
                                        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                                            {bot.cannotDo.map((item, i) => (
                                                <li key={i} style={{ fontSize: "12px", color: "var(--text-secondary)", display: "flex", alignItems: "flex-start", gap: "6px" }}>
                                                    <span style={{ color: "var(--primary)", marginTop: "2px" }}>✕</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Skills Sector */}
                                <div>
                                    <h4 style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                                        <Terminal size={14} /> Installed Skills
                                    </h4>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                        {bot.skills.map(skill => (
                                            <div key={skill} style={{
                                                padding: "4px 10px",
                                                background: "var(--bg-elevated)",
                                                border: "1px solid var(--border-subtle)",
                                                borderRadius: "6px",
                                                fontSize: "11px",
                                                color: "var(--text-primary)",
                                                fontWeight: "500"
                                            }}>
                                                {skill}
                                            </div>
                                        ))}
                                        <button style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            padding: "4px 10px",
                                            background: "transparent",
                                            border: "1px dashed var(--border-hover)",
                                            borderRadius: "6px",
                                            fontSize: "11px",
                                            color: "var(--text-muted)",
                                            fontWeight: "500",
                                            cursor: "pointer",
                                            transition: "all 0.2s"
                                        }}
                                            onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-secondary)'; }}
                                            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                                        >
                                            <Plus size={12} /> Add Node Skill
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
