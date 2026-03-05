"use client";

import { motion } from "framer-motion";

/**
 * AnimatedBlob — Fluid organic shape with infinite morphing animation.
 * @param {string} color - Fill color (default: gold CTA)
 * @param {number} size - Size in px (default: 400)
 * @param {number} delay - Animation delay in seconds
 * @param {string} className - Additional Tailwind classes
 * @param {number} opacity - Blob opacity (default: 0.12)
 */
export default function AnimatedBlob({
    color = "var(--sc-cta)",
    size = 400,
    delay = 0,
    className = "",
    opacity = 0.12,
}) {
    return (
        <motion.div
            aria-hidden="true"
            className={`pointer-events-none absolute ${className}`}
            style={{
                width: size,
                height: size,
                borderRadius: "40% 60% 55% 45% / 55% 40% 60% 45%",
                background: `radial-gradient(ellipse at 30% 30%, ${color}, transparent 70%)`,
                opacity,
                filter: `blur(${Math.round(size * 0.2)}px)`,
            }}
            animate={{
                x: [0, 30, -20, 10, 0],
                y: [0, -40, 20, -10, 0],
                scale: [1, 1.08, 0.95, 1.04, 1],
                borderRadius: [
                    "40% 60% 55% 45% / 55% 40% 60% 45%",
                    "55% 45% 40% 60% / 45% 55% 45% 55%",
                    "45% 55% 60% 40% / 60% 45% 55% 45%",
                    "50% 50% 45% 55% / 50% 50% 55% 45%",
                    "40% 60% 55% 45% / 55% 40% 60% 45%",
                ],
            }}
            transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
        />
    );
}
