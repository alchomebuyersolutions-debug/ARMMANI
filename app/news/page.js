"use client";

import { motion } from "framer-motion";
import { Newspaper, ExternalLink, ArrowRight, TrendingUp, Clock, Globe } from "lucide-react";
import Sidebar from "../components/Sidebar";

const NEWS_DATA = [
    {
        id: 1,
        title: "Federal Reserve indicates potential rate cuts by Q3 as inflation cools",
        source: "Bloomberg",
        time: "10m ago",
        category: "Macroeconomics",
        impact: "High",
        summary: "Market sentiment surges as the Fed hints at an accelerated timeline for rate cuts, driven by stronger-than-expected inflation cooling across core sectors.",
        url: "#"
    },
    {
        id: 2,
        title: "Nvidia earnings smash estimates again, fueling AI sector momentum",
        source: "Nasdaq",
        time: "1h ago",
        category: "Equities",
        impact: "High",
        summary: "The chipmaker reported a 265% year-over-year revenue jump, citing insatiable demand for its next-generation AI accelerators. Markets reacted with a sharp tech rally.",
        url: "#"
    },
    {
        id: 3,
        title: "US Non-Farm Payrolls unexpectedly drop, shifting dollar sentiment",
        source: "Forex Factory",
        time: "2h ago",
        category: "Forex",
        impact: "High",
        summary: "NFP data came in lower than anticipated at 175k versus the forecasted 240k. The USD index dipped below 104 as traders recalibrated ECB vs. Fed differentials.",
        url: "#"
    },
    {
        id: 4,
        title: "Oil prices surge on new OPEC+ production cut agreements",
        source: "Financial Times",
        time: "3h ago",
        category: "Commodities",
        impact: "Medium",
        summary: "Crude oil futures jumped 4% in early trading following a surprise announcement closely aligned OPEC+ members agreeing to restrict supply through the end of the year.",
        url: "#"
    },
    {
        id: 5,
        title: "Apple announces massive $110B stock buyback program",
        source: "Nasdaq",
        time: "5h ago",
        category: "Equities",
        impact: "High",
        summary: "Following a slight beat on fiscal Q2 earnings, Apple announced the largest share repurchase program in corporate history, driving the stock up by 6% in after-hours trading.",
        url: "#"
    },
];

export default function NewsPage() {
    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg-main)" }}>
            <Sidebar />

            <main
                style={{
                    flex: 1,
                    padding: "32px 40px",
                    maxWidth: "1400px",
                    height: "100vh",
                    overflowY: "auto",
                }}
            >
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: "32px" }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <Newspaper size={28} style={{ color: "var(--primary)" }} />
                        <h1 style={{ fontSize: "32px", fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                            Market News
                        </h1>
                    </div>
                    <p style={{ color: "var(--text-muted)", fontSize: "15px", fontWeight: 400, maxWidth: "600px" }}>
                        Real-time algorithmic news aggregation and market impact analysis. Stay ahead of the curve.
                    </p>
                </motion.header>

                {/* News Sources Quick Links */}
                <div style={{ marginBottom: "32px", animation: "fadeIn 0.5s ease-out" }}>
                    <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Live News Sources
                    </h2>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        {[
                            { name: "Forex Factory", url: "https://www.forexfactory.com/", icon: "🌍" },
                            { name: "Nasdaq", url: "https://www.nasdaq.com/", icon: "📈" },
                            { name: "Bloomberg", url: "https://www.bloomberg.com/", icon: "📊" },
                            { name: "Reuters", url: "https://www.reuters.com/", icon: "📰" },
                            { name: "CNBC", url: "https://www.cnbc.com/", icon: "📺" },
                            { name: "CoinDesk", url: "https://www.coindesk.com/", icon: "🪙" },
                            { name: "Yahoo Finance", url: "https://finance.yahoo.com/", icon: "📉" },
                            { name: "TradingView News", url: "https://www.tradingview.com/news/", icon: "⚡" }
                        ].map((source, index) => (
                            <motion.a
                                key={source.name}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ scale: 1.05, y: -2, background: "var(--bg-elevated)", borderColor: "var(--border-strong)" }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "10px 18px",
                                    background: "var(--bg-glass)",
                                    border: "1px solid var(--border-subtle)",
                                    borderRadius: "100px",
                                    color: "var(--text-primary)",
                                    textDecoration: "none",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    backdropFilter: "blur(8px)",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                }}
                            >
                                <span>{source.icon}</span>
                                {source.name}
                                <ExternalLink size={14} style={{ color: "var(--text-muted)", marginLeft: "4px" }} />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Top Stories Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                    gap: "24px"
                }}>
                    {NEWS_DATA.map((news, index) => (
                        <motion.div
                            key={news.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -4 }}
                            style={{
                                background: "var(--bg-glass)",
                                border: "1px solid var(--border-subtle)",
                                borderRadius: "var(--radius-lg)",
                                padding: "24px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                                backdropFilter: "blur(12px)",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            {/* Decorative gradient for High Impact */}
                            {news.impact === "High" && (
                                <div style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "2px",
                                    background: "linear-gradient(90deg, var(--primary), var(--secondary))"
                                }} />
                            )}

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    <span style={{ fontSize: "10px", color: "var(--primary)", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", background: "var(--primary-glow)", padding: "4px 8px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
                                        <Globe size={10} /> {news.source}
                                    </span>
                                    <span style={{ fontSize: "10px", color: "var(--text-secondary)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", background: "var(--bg-elevated)", padding: "4px 8px", borderRadius: "12px" }}>
                                        {news.category}
                                    </span>
                                </div>
                                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px", fontWeight: 500 }}>
                                    <Clock size={12} /> {news.time}
                                </span>
                            </div>

                            <h2 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4, margin: 0 }}>
                                {news.title}
                            </h2>

                            <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, flex: 1 }}>
                                {news.summary}
                            </p>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid var(--border-subtle)", marginTop: "auto" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Impact Potential:</span>
                                    <div style={{ display: "flex", gap: "2px" }}>
                                        <div style={{ width: "12px", height: "4px", borderRadius: "2px", background: news.impact === "High" ? "var(--primary)" : news.impact === "Medium" ? "var(--accent-green)" : "var(--bg-elevated)" }} />
                                        <div style={{ width: "12px", height: "4px", borderRadius: "2px", background: news.impact === "High" ? "var(--primary)" : news.impact === "Medium" ? "var(--accent-green)" : "var(--bg-elevated)" }} />
                                        <div style={{ width: "12px", height: "4px", borderRadius: "2px", background: news.impact === "High" ? "var(--primary)" : "var(--bg-elevated)" }} />
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ x: 4 }}
                                    style={{
                                        background: "transparent",
                                        border: "none",
                                        color: "var(--text-secondary)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        padding: 0
                                    }}
                                >
                                    Read Full <ArrowRight size={14} />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ height: "60px" }}></div>
            </main>
        </div>
    );
}
