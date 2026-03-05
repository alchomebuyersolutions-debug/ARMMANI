"use client";

import { motion } from "framer-motion";
import { DollarSign, BarChart3, Crosshair, ShieldAlert } from "lucide-react";
import GlassCard from "./GlassCard";

const METRICS = [
    {
        icon: DollarSign,
        label: "Portfolio Value",
        value: "$247,830",
        change: "+12.4%",
        positive: true,
        span: "col-span-2 row-span-2",
        large: true,
    },
    {
        icon: BarChart3,
        label: "Daily P&L",
        value: "+$3,420",
        change: "+1.4%",
        positive: true,
        span: "col-span-1 row-span-1",
        large: false,
    },
    {
        icon: Crosshair,
        label: "Active Positions",
        value: "7",
        change: "3 longs, 4 shorts",
        positive: null,
        span: "col-span-1 row-span-1",
        large: false,
    },
    {
        icon: ShieldAlert,
        label: "Risk Score",
        value: "Low",
        change: "Within tolerance",
        positive: true,
        span: "col-span-2 row-span-1",
        large: false,
    },
];

export default function BentoMetrics() {
    return (
        <section className="sc-section">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: "center", marginBottom: "48px" }}
            >
                <span
                    style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--sc-cta)",
                    }}
                >
                    Live Dashboard
                </span>
                <h2
                    style={{
                        fontSize: "clamp(28px, 4vw, 44px)",
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        marginTop: "12px",
                        color: "var(--sc-primary)",
                    }}
                >
                    Actionable Insights at a Glance
                </h2>
                <p
                    style={{
                        color: "var(--sc-text-muted)",
                        fontSize: "16px",
                        maxWidth: "480px",
                        margin: "12px auto 0",
                        lineHeight: 1.6,
                    }}
                >
                    Everything you need — scannable in under 3 seconds.
                </p>
            </motion.div>

            {/* Bento Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "20px",
                }}
            >
                {METRICS.map((metric, i) => {
                    const Icon = metric.icon;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className={metric.span}
                            style={{ display: "flex" }}
                        >
                            <GlassCard
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: metric.large ? "center" : "flex-start",
                                    alignItems: metric.large ? "center" : "flex-start",
                                    padding: metric.large ? "48px" : "24px",
                                    background: metric.large
                                        ? "linear-gradient(135deg, rgba(202,138,4,0.04), rgba(255,255,255,0.7))"
                                        : "var(--sc-glass)",
                                }}
                            >
                                {/* Icon */}
                                <div
                                    style={{
                                        background: "var(--sc-cta-glow)",
                                        borderRadius: "12px",
                                        padding: metric.large ? "14px" : "10px",
                                        marginBottom: metric.large ? "20px" : "14px",
                                    }}
                                >
                                    <Icon
                                        size={metric.large ? 28 : 20}
                                        style={{ color: "var(--sc-cta)" }}
                                    />
                                </div>

                                {/* Label */}
                                <span
                                    style={{
                                        fontSize: metric.large ? "14px" : "12px",
                                        color: "var(--sc-text-muted)",
                                        fontWeight: 600,
                                        letterSpacing: "0.03em",
                                        marginBottom: "4px",
                                    }}
                                >
                                    {metric.label}
                                </span>

                                {/* Value */}
                                <span
                                    style={{
                                        fontSize: metric.large ? "clamp(36px, 5vw, 56px)" : "clamp(22px, 3vw, 28px)",
                                        fontWeight: 800,
                                        fontFamily: "'Outfit', sans-serif",
                                        color: "var(--sc-primary)",
                                        letterSpacing: "-0.03em",
                                        lineHeight: 1.1,
                                    }}
                                >
                                    {metric.value}
                                </span>

                                {/* Change */}
                                <span
                                    style={{
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        marginTop: "6px",
                                        color:
                                            metric.positive === true
                                                ? "var(--sc-success)"
                                                : metric.positive === false
                                                    ? "var(--sc-error)"
                                                    : "var(--sc-text-muted)",
                                    }}
                                >
                                    {metric.change}
                                </span>
                            </GlassCard>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
