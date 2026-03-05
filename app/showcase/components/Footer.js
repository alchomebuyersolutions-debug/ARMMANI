"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            style={{
                background: "var(--sc-bg-subtle)",
                borderTop: "1px solid var(--sc-border)",
                padding: "48px 24px",
            }}
        >
            <div
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "24px",
                }}
            >
                {/* Brand */}
                <div>
                    <span
                        style={{
                            fontSize: "18px",
                            fontWeight: 800,
                            fontFamily: "'Outfit', sans-serif",
                            color: "var(--sc-primary)",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Alpha<span style={{ color: "var(--sc-cta)" }}>Market</span>
                    </span>
                    <p style={{ fontSize: "13px", color: "var(--sc-text-muted)", marginTop: "4px" }}>
                        AI-powered trading intelligence
                    </p>
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                    {["Features", "Pricing", "Case Studies", "Docs", "Support"].map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().replace(" ", "-")}`}
                            style={{
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "var(--sc-text-muted)",
                                textDecoration: "none",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => { e.target.style.color = "var(--sc-primary)"; }}
                            onMouseLeave={(e) => { e.target.style.color = "var(--sc-text-muted)"; }}
                        >
                            {link}
                        </a>
                    ))}
                </div>

                {/* Back to top */}
                <motion.button
                    onClick={scrollToTop}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: "var(--sc-glass)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid var(--sc-border)",
                        borderRadius: "12px",
                        padding: "10px",
                        cursor: "pointer",
                        color: "var(--sc-text-muted)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    aria-label="Back to top"
                >
                    <ArrowUp size={18} />
                </motion.button>
            </div>

            {/* Bottom */}
            <div
                style={{
                    maxWidth: "1280px",
                    margin: "32px auto 0",
                    paddingTop: "20px",
                    borderTop: "1px solid var(--sc-border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                    fontSize: "12px",
                    color: "var(--sc-text-muted)",
                }}
            >
                <span>© 2026 Alpha Market. All rights reserved.</span>
                <div style={{ display: "flex", gap: "16px" }}>
                    <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
                    <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
                    <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Cookies</a>
                </div>
            </div>
        </footer>
    );
}
