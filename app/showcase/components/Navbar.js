"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = [
    { label: "Features", href: "#features" },
    { label: "Stats", href: "#stats" },
    { label: "Showcase", href: "#showcase" },
    { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 48);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    padding: scrolled ? "12px 24px" : "20px 24px",
                    background: scrolled ? "var(--sc-glass-strong)" : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    borderBottom: scrolled ? "1px solid var(--sc-border)" : "1px solid transparent",
                    transition: "all 0.3s ease",
                }}
            >
                <div
                    style={{
                        maxWidth: "1280px",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {/* Logo */}
                    <a href="/showcase" style={{ textDecoration: "none" }}>
                        <span
                            style={{
                                fontSize: "20px",
                                fontWeight: 800,
                                fontFamily: "'Outfit', sans-serif",
                                color: "var(--sc-primary)",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Alpha<span style={{ color: "var(--sc-cta)" }}>Market</span>
                        </span>
                    </a>

                    {/* Desktop Links */}
                    <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden md:flex">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                style={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "var(--sc-text-secondary)",
                                    textDecoration: "none",
                                    transition: "color 0.2s",
                                }}
                                onMouseEnter={(e) => { e.target.style.color = "var(--sc-primary)"; }}
                                onMouseLeave={(e) => { e.target.style.color = "var(--sc-text-secondary)"; }}
                            >
                                {link.label}
                            </a>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                background: "linear-gradient(135deg, var(--sc-cta), var(--sc-cta-hover))",
                                color: "#fff",
                                border: "none",
                                padding: "10px 22px",
                                borderRadius: "10px",
                                fontSize: "14px",
                                fontWeight: 700,
                                fontFamily: "'Outfit', sans-serif",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                boxShadow: "0 2px 12px rgba(202,138,4,0.2)",
                            }}
                        >
                            Get Started <ArrowRight size={14} />
                        </motion.button>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden"
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--sc-primary)",
                            padding: "4px",
                        }}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden"
                        style={{
                            position: "fixed",
                            top: "64px",
                            left: 0,
                            right: 0,
                            zIndex: 49,
                            background: "var(--sc-glass-strong)",
                            backdropFilter: "blur(20px)",
                            borderBottom: "1px solid var(--sc-border)",
                            padding: "24px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}
                    >
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    color: "var(--sc-text)",
                                    textDecoration: "none",
                                    padding: "8px 0",
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
