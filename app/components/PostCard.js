"use client";

import { motion } from "framer-motion";
import {
    ArrowUpCircle,
    MessageCircle,
    User,
    ExternalLink,
    Clock,
    Award,
} from "lucide-react";

function formatScore(score) {
    if (score >= 1000) {
        return (score / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return score.toString();
}

function timeAgo(utcSeconds) {
    const now = Date.now() / 1000;
    const diff = now - utcSeconds;
    const days = Math.floor(diff / 86400);
    if (days > 365) return `${Math.floor(days / 365)}y ago`;
    if (days > 30) return `${Math.floor(days / 30)}mo ago`;
    if (days > 0) return `${days}d ago`;
    const hours = Math.floor(diff / 3600);
    if (hours > 0) return `${hours}h ago`;
    return "just now";
}

const rankColors = [
    { bg: "linear-gradient(135deg, #FFD700, #FFA500)", text: "#000" },
    { bg: "linear-gradient(135deg, #C0C0C0, #A0A0A0)", text: "#000" },
    { bg: "linear-gradient(135deg, #CD7F32, #A0522D)", text: "#fff" },
    { bg: "var(--bg-elevated)", text: "var(--text-secondary)" },
    { bg: "var(--bg-elevated)", text: "var(--text-secondary)" },
    { bg: "var(--bg-elevated)", text: "var(--text-secondary)" },
];

export default function PostCard({ post, index }) {
    const rank = rankColors[index] || rankColors[5];
    const isTop3 = index < 3;

    return (
        <motion.a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                padding: "22px",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-glass)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--border-subtle)",
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: `border-color var(--duration-normal) var(--ease-out),
                     box-shadow var(--duration-normal) var(--ease-out)`,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.boxShadow = isTop3
                    ? "var(--shadow-glow-primary)"
                    : "var(--shadow-card)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            {/* Top row: Rank + Flair */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    {/* Rank Badge */}
                    <div
                        style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "var(--radius-sm)",
                            background: rank.bg,
                            color: rank.text,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: 700,
                            fontFamily: "var(--font-display)",
                            flexShrink: 0,
                        }}
                    >
                        {index + 1}
                    </div>

                    {isTop3 && (
                        <Award
                            size={14}
                            style={{ color: "var(--primary)", opacity: 0.7 }}
                        />
                    )}
                </div>

                {/* Flair Tag */}
                {post.linkFlairText && (
                    <span
                        style={{
                            fontSize: "10px",
                            fontWeight: 600,
                            color: "var(--secondary)",
                            background: "var(--secondary-glow)",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                        }}
                    >
                        {post.linkFlairText}
                    </span>
                )}
            </div>

            {/* Title */}
            <h3
                style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "15px",
                    fontWeight: 600,
                    lineHeight: 1.45,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    flex: 1,
                }}
            >
                {post.title}
            </h3>

            {/* Preview Text */}
            {post.selftext && (
                <p
                    style={{
                        fontSize: "12px",
                        lineHeight: 1.5,
                        color: "var(--text-muted)",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {post.selftext}
                </p>
            )}

            {/* Divider */}
            <div
                style={{
                    height: "1px",
                    background: "var(--border-subtle)",
                    margin: "0",
                }}
            />

            {/* Meta Row */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "8px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                    }}
                >
                    {/* Upvotes */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "var(--primary)",
                        }}
                    >
                        <ArrowUpCircle size={14} />
                        <span>{formatScore(post.score)}</span>
                    </div>

                    {/* Comments */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "var(--text-secondary)",
                        }}
                    >
                        <MessageCircle size={13} />
                        <span>{post.numComments}</span>
                    </div>

                    {/* Time */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "11px",
                            color: "var(--text-muted)",
                        }}
                    >
                        <Clock size={12} />
                        <span>{timeAgo(post.createdUtc)}</span>
                    </div>
                </div>

                {/* Author */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "11px",
                        color: "var(--text-muted)",
                    }}
                >
                    <User size={12} />
                    <span>u/{post.author}</span>
                </div>
            </div>

            {/* Hover External Link Icon */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    opacity: 0,
                    color: "var(--text-muted)",
                    transition: "opacity var(--duration-fast) ease",
                }}
            >
                <ExternalLink size={14} />
            </motion.div>

            {/* Subtle gradient accent for top 3 */}
            {isTop3 && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background:
                            "linear-gradient(90deg, var(--primary), var(--secondary))",
                        opacity: 0.6,
                        borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
                    }}
                />
            )}
        </motion.a>
    );
}
