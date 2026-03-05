"use client";

import { motion } from "framer-motion";
import { BookOpen, Star, Download, PlayCircle, Book } from "lucide-react";
import Sidebar from "../components/Sidebar";

const BOOK_LIBRARY = [
    {
        id: 1,
        title: "Algorithmic Trading & DMA",
        author: "Barry Johnson",
        type: "PDF",
        category: "Quantitative Trading",
        rating: 4.8,
        description: "An essential comprehensive guide for institutional traders seeking algorithmic solutions and an understanding of Direct Market Access (DMA) fundamentals.",
        coverColor: "linear-gradient(135deg, #1A2980 0%, #26D0CE 100%)",
    },
    {
        id: 2,
        title: "Trading Systems and Methods",
        author: "Perry J. Kaufman",
        type: "Audiobook",
        category: "System Design",
        rating: 4.9,
        description: "The complete guide to trading systems, updated for the 21st century. Covers everything from basic trends to advanced statistical arbitrage.",
        coverColor: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
    },
    {
        id: 3,
        title: "Expert Advisor Programming for MetaTrader 5",
        author: "Andrew R. Young",
        type: "ePub",
        category: "MQL5 / MT5",
        rating: 4.7,
        description: "Learn how to build, test, and deploy automated trading strategies using MQL5 for the MetaTrader 5 platform.",
        coverColor: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    },
    {
        id: 4,
        title: "Machine Learning for Algorithmic Trading",
        author: "Stefan Jansen",
        type: "PDF",
        category: "AI & ML",
        rating: 4.6,
        description: "Predictive models to extract signals from market and alternative data for systematic trading strategies with Python.",
        coverColor: "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)",
    },
    {
        id: 5,
        title: "The LTA Book",
        author: "TBD",
        type: "PDF",
        category: "Trading Strategies",
        rating: 5.0,
        description: "The LTA resource book containing key trading concepts, methodologies, and technical insights.",
        coverColor: "linear-gradient(135deg, #FAD961 0%, #F76B1C 100%)",
    }
];

export default function BooksPage() {
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
                    style={{ marginBottom: "40px" }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                        <div style={{ padding: "10px", background: "var(--primary-glow)", borderRadius: "12px" }}>
                            <BookOpen size={28} style={{ color: "var(--primary)" }} />
                        </div>
                        <h1 style={{ fontSize: "32px", fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "var(--text-primary)", letterSpacing: "-0.03em", margin: 0 }}>
                            Trading Library
                        </h1>
                    </div>
                    <p style={{ color: "var(--text-muted)", fontSize: "15px", fontWeight: 400, maxWidth: "600px", margin: 0 }}>
                        Curated texts, algorithms manuals, and statistical modeling literature.
                    </p>
                </motion.header>

                {/* Books Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: "32px"
                }}>
                    {BOOK_LIBRARY.map((book, index) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            style={{
                                background: "var(--bg-glass)",
                                border: "1px solid var(--border-subtle)",
                                borderRadius: "var(--radius-lg)",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                backdropFilter: "blur(12px)",
                                position: "relative"
                            }}
                        >
                            {/* Book Cover Placeholder */}
                            <div style={{
                                height: "180px",
                                background: book.coverColor,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                overflow: "hidden"
                            }}>
                                {/* Overlay pattern */}
                                <div style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    opacity: 0.1,
                                    backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                                    backgroundSize: "24px 24px"
                                }} />

                                <Book size={64} color="rgba(255,255,255,0.8)" strokeWidth={1.5} />

                                {/* Badge */}
                                <div style={{
                                    position: "absolute",
                                    top: "16px",
                                    right: "16px",
                                    background: "rgba(0,0,0,0.5)",
                                    backdropFilter: "blur(4px)",
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                    color: "white",
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    letterSpacing: "0.05em",
                                    textTransform: "uppercase"
                                }}>
                                    {book.category}
                                </div>
                            </div>

                            {/* Book Info */}
                            <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                                    <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, margin: 0, fontFamily: "'Outfit', sans-serif" }}>
                                        {book.title}
                                    </h2>
                                </div>

                                <h3 style={{ fontSize: "13px", fontWeight: 500, color: "var(--primary)", margin: "0 0 16px 0" }}>
                                    by {book.author}
                                </h3>

                                <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, flex: 1 }}>
                                    {book.description}
                                </p>

                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid var(--border-subtle)" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#F59E0B" }}>
                                        <Star size={14} fill="#F59E0B" />
                                        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>{book.rating}</span>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                                            border: "none",
                                            color: "white",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            cursor: "pointer",
                                            padding: "8px 16px",
                                            borderRadius: "var(--radius-sm)",
                                            boxShadow: "0 4px 12px rgba(255, 109, 90, 0.2)"
                                        }}
                                    >
                                        {book.type === "Audiobook" ? <PlayCircle size={14} /> : <Download size={14} />}
                                        {book.type}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ height: "60px" }}></div>
            </main>
        </div>
    );
}
