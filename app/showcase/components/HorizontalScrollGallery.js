"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, GripHorizontal } from "lucide-react";

const CASE_STUDIES = [
    {
        title: "Gold Scalping Strategy",
        result: "+$18,400 in 30 days",
        desc: "AI-detected price action patterns on XAUUSD with 0.5% risk per trade. Fully automated execution via MetaApi.",
        tag: "MT5 · Automated",
        color: "#CA8A04",
    },
    {
        title: "BTC Momentum Engine",
        result: "94% win rate over 120 trades",
        desc: "Sentiment-driven crypto futures trading on Blofin with dynamic position sizing based on volatility bands.",
        tag: "Blofin · Crypto",
        color: "#1C1917",
    },
    {
        title: "Multi-Asset Hedge",
        result: "Max drawdown: 1.8%",
        desc: "Simultaneous long/short portfolio across forex, indices, and crypto — balanced by the risk engine.",
        tag: "Portfolio · Risk",
        color: "#78716C",
    },
    {
        title: "News-Driven Entries",
        result: "3.2x average R:R",
        desc: "Real-time Apify news scraping triggers pre-analyzed setups. Signal → trade in under 2 seconds.",
        tag: "Apify · Signals",
        color: "#CA8A04",
    },
    {
        title: "Telegram Signal Relay",
        result: "4,189 subscribers served",
        desc: "Bot polls Telegram channels, parses signals, executes on MT5 with full risk checks — zero manual input.",
        tag: "Telegram · Bot",
        color: "#1C1917",
    },
];

export default function HorizontalScrollGallery() {
    const scrollRef = useRef(null);

    return (
        <section className="sc-section" style={{ maxWidth: "100%", paddingLeft: "0", paddingRight: "0" }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: "center", marginBottom: "40px", padding: "0 24px" }}
            >
                <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sc-cta)" }}>
                    Case Studies
                </span>
                <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginTop: "12px", color: "var(--sc-primary)" }}>
                    Real Results. Real Trades.
                </h2>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "16px", color: "var(--sc-text-muted)", fontSize: "13px" }}>
                    <GripHorizontal size={14} />
                    <span>Drag to explore</span>
                </div>
            </motion.div>

            {/* Scroll Strip */}
            <motion.div
                ref={scrollRef}
                className="sc-hscroll"
                style={{ paddingLeft: "max(24px, calc((100vw - 1280px) / 2 + 24px))", paddingRight: "48px" }}
            >
                {CASE_STUDIES.map((study, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        whileHover={{ y: -6 }}
                        style={{
                            width: "360px",
                            minWidth: "360px",
                            background: "var(--sc-glass-strong)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid var(--sc-border)",
                            borderRadius: "20px",
                            padding: "32px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                            cursor: "default",
                            transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `0 12px 48px ${study.color}12`;
                            e.currentTarget.style.borderColor = `${study.color}25`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.borderColor = "var(--sc-border)";
                        }}
                    >
                        {/* Tag */}
                        <span
                            style={{
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: study.color,
                                background: `${study.color}12`,
                                padding: "4px 12px",
                                borderRadius: "6px",
                                alignSelf: "flex-start",
                            }}
                        >
                            {study.tag}
                        </span>

                        {/* Title */}
                        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--sc-primary)", margin: 0, lineHeight: 1.3 }}>
                            {study.title}
                        </h3>

                        {/* Result */}
                        <span className="sc-text-gold" style={{ fontSize: "24px", fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
                            {study.result}
                        </span>

                        {/* Description */}
                        <p style={{ fontSize: "14px", color: "var(--sc-text-secondary)", lineHeight: 1.6, margin: 0 }}>
                            {study.desc}
                        </p>

                        {/* Read More */}
                        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: "var(--sc-cta)", marginTop: "auto", cursor: "pointer" }}>
                            View Details <ArrowRight size={14} />
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
