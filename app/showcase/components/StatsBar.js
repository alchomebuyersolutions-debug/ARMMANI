"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Target, Zap } from "lucide-react";

const STATS = [
    { icon: TrendingUp, value: 12847, suffix: "+", label: "Trades Executed", format: true },
    { icon: Target, value: 94.2, suffix: "%", label: "Win Rate", format: false },
    { icon: Zap, value: 2.8, suffix: "%", label: "Avg Daily Return", format: false },
    { icon: Users, value: 3200, suffix: "+", label: "Active Traders", format: true },
];

function useCountUp(target, inView, duration = 2000) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!inView || hasAnimated.current) return;
        hasAnimated.current = true;

        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const stepDuration = duration / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [inView, target, duration]);

    return count;
}

function StatItem({ icon: Icon, value, suffix, label, format, inView }) {
    const count = useCountUp(value, inView);
    const displayValue = format
        ? Math.floor(count).toLocaleString()
        : Number.isInteger(value)
            ? Math.floor(count)
            : count.toFixed(1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                padding: "24px",
            }}
        >
            <div
                style={{
                    background: "var(--sc-cta-glow)",
                    borderRadius: "12px",
                    padding: "10px",
                    marginBottom: "4px",
                }}
            >
                <Icon size={22} style={{ color: "var(--sc-cta)" }} />
            </div>
            <span
                style={{
                    fontSize: "clamp(28px, 4vw, 40px)",
                    fontWeight: 800,
                    fontFamily: "'Outfit', sans-serif",
                    color: "var(--sc-primary)",
                    letterSpacing: "-0.03em",
                }}
            >
                {displayValue}{suffix}
            </span>
            <span
                style={{
                    fontSize: "13px",
                    color: "var(--sc-text-muted)",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                }}
            >
                {label}
            </span>
        </motion.div>
    );
}

export default function StatsBar() {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="sc-section" style={{ paddingTop: "64px", paddingBottom: "64px" }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    background: "var(--sc-glass-strong)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid var(--sc-border)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "var(--sc-shadow)",
                }}
            >
                {STATS.map((stat, i) => (
                    <StatItem key={i} {...stat} inView={inView} />
                ))}
            </div>
        </section>
    );
}
