"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import AnimatedBlob from "./AnimatedBlob";

const SLIDES = [
    {
        tag: "AI-Powered Execution",
        headline: "Trade Smarter,\nNot Harder",
        sub: "Institutional-grade algorithms that analyze, execute, and protect your capital — 24/7.",
        cta: "Start Trading",
    },
    {
        tag: "Real-Time Intelligence",
        headline: "See the Market\nBefore It Moves",
        sub: "Multi-source data fusion from news, sentiment, and on-chain analytics in one unified feed.",
        cta: "Explore Signals",
    },
    {
        tag: "Risk-First Architecture",
        headline: "Built-In\nRisk Armor",
        sub: "Drawdown guards, revenge-trade detection, and auto position sizing protect every trade.",
        cta: "View Risk Engine",
    },
];

const SLIDE_DURATION = 6000;

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(next, SLIDE_DURATION);
        return () => clearInterval(timer);
    }, [next]);

    const slide = SLIDES[current];

    return (
        <section
            id="hero"
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                background: "var(--sc-bg)",
            }}
        >
            {/* Animated blobs */}
            <AnimatedBlob color="#CA8A04" size={600} opacity={0.08} className="top-[-10%] right-[-5%]" delay={0} />
            <AnimatedBlob color="#1C1917" size={500} opacity={0.04} className="bottom-[-15%] left-[-10%]" delay={4} />
            <AnimatedBlob color="#CA8A04" size={350} opacity={0.06} className="top-[40%] left-[60%]" delay={8} />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "800px", padding: "0 24px" }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Tag */}
                        <motion.span
                            style={{
                                display: "inline-block",
                                fontSize: "12px",
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: "var(--sc-cta)",
                                background: "var(--sc-cta-glow)",
                                padding: "6px 16px",
                                borderRadius: "24px",
                                marginBottom: "24px",
                                border: "1px solid rgba(202, 138, 4, 0.2)",
                            }}
                        >
                            {slide.tag}
                        </motion.span>

                        {/* Headline */}
                        <h1
                            style={{
                                fontSize: "clamp(40px, 7vw, 80px)",
                                fontWeight: 800,
                                lineHeight: 1.05,
                                letterSpacing: "-0.04em",
                                color: "var(--sc-primary)",
                                margin: "24px 0",
                                whiteSpace: "pre-line",
                            }}
                        >
                            {slide.headline}
                        </h1>

                        {/* Sub */}
                        <p
                            style={{
                                fontSize: "clamp(16px, 2vw, 20px)",
                                color: "var(--sc-text-secondary)",
                                lineHeight: 1.6,
                                maxWidth: "560px",
                                margin: "0 auto 40px",
                            }}
                        >
                            {slide.sub}
                        </p>

                        {/* CTA */}
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                background: "linear-gradient(135deg, var(--sc-cta), var(--sc-cta-hover))",
                                color: "#fff",
                                border: "none",
                                padding: "16px 36px",
                                borderRadius: "12px",
                                fontSize: "16px",
                                fontWeight: 700,
                                fontFamily: "'Outfit', sans-serif",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                boxShadow: "0 4px 24px rgba(202, 138, 4, 0.3)",
                            }}
                        >
                            {slide.cta} <ArrowRight size={18} />
                        </motion.button>
                    </motion.div>
                </AnimatePresence>

                {/* Slide Dots */}
                <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "48px" }}>
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            style={{
                                width: i === current ? "32px" : "8px",
                                height: "8px",
                                borderRadius: "4px",
                                border: "none",
                                background: i === current ? "var(--sc-cta)" : "var(--sc-border-hover)",
                                cursor: "pointer",
                                transition: "all 0.4s ease",
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                className="sc-scroll-cta"
                style={{
                    position: "absolute",
                    bottom: "32px",
                    left: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    color: "var(--sc-text-muted)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                }}
            >
                <span>Scroll</span>
                <ChevronDown size={16} />
            </div>
        </section>
    );
}
