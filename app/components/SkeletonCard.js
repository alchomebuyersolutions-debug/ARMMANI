"use client";

import { motion } from "framer-motion";

export default function SkeletonCard({ index = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
            }}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                padding: "22px",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-glass)",
                border: "1px solid var(--border-subtle)",
            }}
        >
            {/* Top row skeleton */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                    className="skeleton"
                    style={{ width: "28px", height: "28px", borderRadius: "var(--radius-sm)" }}
                />
                <div
                    className="skeleton"
                    style={{ width: "60px", height: "16px" }}
                />
            </div>

            {/* Title skeleton - 2 lines */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div
                    className="skeleton"
                    style={{ width: "100%", height: "16px" }}
                />
                <div
                    className="skeleton"
                    style={{ width: "75%", height: "16px" }}
                />
            </div>

            {/* Preview text skeleton */}
            <div
                className="skeleton"
                style={{ width: "90%", height: "12px" }}
            />

            {/* Divider */}
            <div
                style={{
                    height: "1px",
                    background: "var(--border-subtle)",
                }}
            />

            {/* Meta row skeleton */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div className="skeleton" style={{ width: "50px", height: "14px" }} />
                <div className="skeleton" style={{ width: "35px", height: "14px" }} />
                <div className="skeleton" style={{ width: "45px", height: "14px" }} />
                <div style={{ flex: 1 }} />
                <div className="skeleton" style={{ width: "70px", height: "14px" }} />
            </div>
        </motion.div>
    );
}
