"use client";

import { motion } from "framer-motion";

/**
 * GlassCard — Glassmorphic card with backdrop blur and hover glow.
 * @param {React.ReactNode} children
 * @param {string} className - Additional classes
 * @param {string} glowColor - Hover glow color (default: gold)
 * @param {boolean} hover - Enable hover lift effect
 * @param {object} style - Additional inline styles
 */
export default function GlassCard({
    children,
    className = "",
    glowColor = "var(--sc-cta)",
    hover = true,
    style = {},
    ...props
}) {
    return (
        <motion.div
            className={`glass-card ${className}`}
            whileHover={hover ? { y: -4, scale: 1.01 } : {}}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(28, 25, 23, 0.06)",
                borderRadius: "16px",
                padding: "24px",
                position: "relative",
                overflow: "hidden",
                transition: "box-shadow 0.4s ease, border-color 0.4s ease",
                ...style,
            }}
            onMouseEnter={(e) => {
                if (hover) {
                    e.currentTarget.style.boxShadow = `0 8px 40px ${glowColor}18, 0 2px 12px rgba(0,0,0,0.06)`;
                    e.currentTarget.style.borderColor = `${glowColor}30`;
                }
            }}
            onMouseLeave={(e) => {
                if (hover) {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "rgba(28, 25, 23, 0.06)";
                }
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
