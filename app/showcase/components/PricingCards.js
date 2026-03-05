"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";
import GlassCard from "./GlassCard";

const TIERS = [
    {
        name: "Starter",
        price: "$49",
        period: "/month",
        desc: "For individual traders getting started with automation.",
        features: [
            "1 MT5 Account",
            "Basic risk engine",
            "5 signals per day",
            "Email support",
            "Community access",
        ],
        popular: false,
        cta: "Get Started",
    },
    {
        name: "Pro",
        price: "$149",
        period: "/month",
        desc: "For serious traders who want full automation and insights.",
        features: [
            "5 MT5 Accounts",
            "Advanced risk engine",
            "Unlimited signals",
            "Blofin crypto trading",
            "Priority support",
            "Custom strategy builder",
            "Telegram bot integration",
        ],
        popular: true,
        cta: "Start Pro Trial",
    },
    {
        name: "Institution",
        price: "$499",
        period: "/month",
        desc: "For funds and teams with custom requirements.",
        features: [
            "Unlimited accounts",
            "Multi-asset portfolio",
            "Dedicated infrastructure",
            "Custom API access",
            "White-glove onboarding",
            "SLA guarantee",
            "CopyFactory integration",
        ],
        popular: false,
        cta: "Contact Sales",
    },
];

export default function PricingCards() {
    return (
        <section className="sc-section">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: "center", marginBottom: "56px" }}
            >
                <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sc-cta)" }}>
                    Transparent Pricing
                </span>
                <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginTop: "12px", color: "var(--sc-primary)" }}>
                    Choose Your Edge
                </h2>
                <p style={{ color: "var(--sc-text-muted)", fontSize: "16px", maxWidth: "420px", margin: "12px auto 0", lineHeight: 1.6 }}>
                    No hidden fees. Cancel anytime. 14-day free trial on all plans.
                </p>
            </motion.div>

            {/* Cards */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "24px",
                    alignItems: "stretch",
                }}
            >
                {TIERS.map((tier, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12, duration: 0.5 }}
                        style={{ display: "flex" }}
                    >
                        <GlassCard
                            glowColor={tier.popular ? "var(--sc-cta)" : "var(--sc-accent)"}
                            style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                padding: tier.popular ? "32px" : "28px",
                                background: tier.popular
                                    ? "linear-gradient(145deg, rgba(202,138,4,0.06), rgba(255,255,255,0.8))"
                                    : "var(--sc-glass)",
                                border: tier.popular ? "2px solid rgba(202,138,4,0.25)" : "1px solid var(--sc-border)",
                                position: "relative",
                            }}
                        >
                            {/* Popular badge */}
                            {tier.popular && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "-12px",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        background: "linear-gradient(135deg, var(--sc-cta), var(--sc-cta-hover))",
                                        color: "#fff",
                                        fontSize: "11px",
                                        fontWeight: 700,
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        padding: "5px 16px",
                                        borderRadius: "20px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        boxShadow: "0 4px 16px rgba(202,138,4,0.3)",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    <Star size={12} /> Most Popular
                                </div>
                            )}

                            {/* Tier name */}
                            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--sc-primary)", margin: "0 0 8px 0" }}>
                                {tier.name}
                            </h3>

                            {/* Price */}
                            <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "8px" }}>
                                <span style={{ fontSize: "40px", fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: "var(--sc-primary)", letterSpacing: "-0.03em" }}>
                                    {tier.price}
                                </span>
                                <span style={{ fontSize: "14px", color: "var(--sc-text-muted)" }}>
                                    {tier.period}
                                </span>
                            </div>

                            {/* Description */}
                            <p style={{ fontSize: "14px", color: "var(--sc-text-secondary)", lineHeight: 1.6, margin: "0 0 24px 0" }}>
                                {tier.desc}
                            </p>

                            {/* Features */}
                            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                                {tier.features.map((f, fi) => (
                                    <li key={fi} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--sc-text)" }}>
                                        <Check size={16} style={{ color: "var(--sc-success)", flexShrink: 0 }} />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    width: "100%",
                                    padding: "14px",
                                    borderRadius: "12px",
                                    fontSize: "15px",
                                    fontWeight: 700,
                                    fontFamily: "'Outfit', sans-serif",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    border: tier.popular ? "none" : "1px solid var(--sc-border-hover)",
                                    background: tier.popular
                                        ? "linear-gradient(135deg, var(--sc-cta), var(--sc-cta-hover))"
                                        : "transparent",
                                    color: tier.popular ? "#fff" : "var(--sc-primary)",
                                    boxShadow: tier.popular ? "0 4px 20px rgba(202,138,4,0.25)" : "none",
                                }}
                            >
                                {tier.cta} <ArrowRight size={16} />
                            </motion.button>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
