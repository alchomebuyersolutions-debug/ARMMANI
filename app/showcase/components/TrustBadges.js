"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Award, Headphones } from "lucide-react";

const BADGES = [
    { icon: ShieldCheck, label: "SSL Encrypted", detail: "256-bit security" },
    { icon: Clock, label: "99.9% Uptime", detail: "Enterprise SLA" },
    { icon: Award, label: "Regulated", detail: "Licensed broker" },
    { icon: Headphones, label: "24/7 Support", detail: "Live assistance" },
];

export default function TrustBadges() {
    return (
        <section className="sc-section" style={{ paddingTop: "0", paddingBottom: "48px" }}>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "16px",
                }}
            >
                {BADGES.map((badge, i) => {
                    const Icon = badge.icon;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "12px 20px",
                                background: "var(--sc-glass)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid var(--sc-border)",
                                borderRadius: "12px",
                                minWidth: "200px",
                            }}
                        >
                            <div
                                style={{
                                    background: "var(--sc-cta-glow)",
                                    borderRadius: "10px",
                                    padding: "8px",
                                    flexShrink: 0,
                                }}
                            >
                                <Icon size={18} style={{ color: "var(--sc-cta)" }} />
                            </div>
                            <div>
                                <div
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        color: "var(--sc-primary)",
                                    }}
                                >
                                    {badge.label}
                                </div>
                                <div
                                    style={{
                                        fontSize: "11px",
                                        color: "var(--sc-text-muted)",
                                        marginTop: "1px",
                                    }}
                                >
                                    {badge.detail}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
