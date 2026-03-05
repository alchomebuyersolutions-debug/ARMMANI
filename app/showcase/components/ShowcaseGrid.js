"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const GALLERY_ITEMS = [
    { id: 1, title: "AI Signal Detection", category: "Intelligence", color: "#CA8A04", aspect: "4/3" },
    { id: 2, title: "Multi-Asset Dashboard", category: "Interface", color: "#1C1917", aspect: "3/4" },
    { id: 3, title: "Risk Heat Map", category: "Analytics", color: "#78716C", aspect: "4/3" },
    { id: 4, title: "Trade Execution Flow", category: "Systems", color: "#CA8A04", aspect: "1/1" },
    { id: 5, title: "Sentiment Analysis", category: "Intelligence", color: "#1C1917", aspect: "4/3" },
    { id: 6, title: "Portfolio Optimizer", category: "Tools", color: "#78716C", aspect: "3/4" },
];

function ImageZoomModal({ item, onClose }) {
    if (!item) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            onKeyDown={(e) => e.key === "Escape" && onClose()}
            role="dialog"
            aria-label={`Zoomed view of ${item.title}`}
            tabIndex={-1}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                background: "rgba(10, 10, 10, 0.85)",
                backdropFilter: "blur(20px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "zoom-out",
                padding: "40px",
            }}
        >
            <motion.button
                onClick={onClose}
                aria-label="Close"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                    position: "absolute",
                    top: "24px",
                    right: "24px",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#fff",
                }}
            >
                <X size={20} />
            </motion.button>

            <motion.div
                layoutId={`gallery-${item.id}`}
                style={{
                    width: "100%",
                    maxWidth: "720px",
                    aspectRatio: "16/10",
                    borderRadius: "20px",
                    background: `linear-gradient(135deg, ${item.color}22, ${item.color}08)`,
                    border: `1px solid ${item.color}33`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <span style={{ fontSize: "32px", fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: "#fff" }}>
                    {item.title}
                </span>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {item.category}
                </span>
            </motion.div>
        </motion.div>
    );
}

export default function ShowcaseGrid() {
    const [selected, setSelected] = useState(null);

    return (
        <section className="sc-section">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: "center", marginBottom: "48px" }}
            >
                <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sc-cta)" }}>
                    Platform Showcase
                </span>
                <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginTop: "12px", color: "var(--sc-primary)" }}>
                    See What&apos;s Possible
                </h2>
            </motion.div>

            {/* Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "20px",
                }}
            >
                {GALLERY_ITEMS.map((item, i) => (
                    <motion.div
                        key={item.id}
                        layoutId={`gallery-${item.id}`}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        whileHover={{ scale: 1.03, y: -4 }}
                        onClick={() => setSelected(item)}
                        style={{
                            aspectRatio: item.aspect,
                            borderRadius: "16px",
                            background: `linear-gradient(145deg, ${item.color}12, ${item.color}06)`,
                            border: "1px solid var(--sc-border)",
                            cursor: "zoom-in",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            position: "relative",
                            overflow: "hidden",
                            transition: "box-shadow 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `0 12px 40px ${item.color}15`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        {/* Zoom icon overlay */}
                        <div
                            style={{
                                position: "absolute",
                                top: "12px",
                                right: "12px",
                                background: "var(--sc-glass)",
                                backdropFilter: "blur(8px)",
                                borderRadius: "8px",
                                padding: "6px",
                                opacity: 0.5,
                                transition: "opacity 0.2s",
                            }}
                            className="zoom-icon"
                        >
                            <ZoomIn size={14} style={{ color: "var(--sc-text-muted)" }} />
                        </div>

                        <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "var(--sc-primary)" }}>
                            {item.title}
                        </span>
                        <span style={{ fontSize: "12px", color: "var(--sc-text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            {item.category}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Zoom Modal */}
            <AnimatePresence>
                {selected && <ImageZoomModal item={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </section>
    );
}
