"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    TrendingUp,
    Clock,
    Flame,
    Star,
    Settings,
    ExternalLink,
    Zap,
    Layers,
    Info,
    Menu,
    X,
    Calculator,
    Scale,
    Ruler,
    Network,
    BookOpen,
    Newspaper,
    MessageSquare,
} from "lucide-react";

const navItems = [
    {
        group: "Overview",
        items: [
            { label: "Dashboard", href: "/", icon: LayoutDashboard },
            { label: "Bot Fleet", href: "/fleet", icon: Network },
            { label: "Market News", href: "/news", icon: Newspaper },
            { label: "Analytics", disabled: true, icon: TrendingUp },
            { label: "Realtime", disabled: true, icon: Clock },
        ],
    },
    {
        group: "Explore",
        items: [
            { label: "MCP Store", href: "/mcp-store", icon: Layers },
            { label: "AI Models", disabled: true, icon: Flame },
            { label: "Workflows", disabled: true, icon: Zap },
        ],
    },
    {
        group: "Tools",
        items: [
            { label: "Gravity Chat", href: "/chat", icon: MessageSquare },
            { label: "Profit Calculator", href: "/tools/calculator", icon: Calculator },
            { label: "Risk/Reward", disabled: true, icon: Scale },
            { label: "Lot Size", disabled: true, icon: Ruler },
        ],
    },
    {
        group: "Resources",
        items: [
            { label: "3D & Design", href: "/resources", icon: ExternalLink },
            { label: "Book Library", href: "/books", icon: BookOpen },
        ],
    },
    {
        group: "Settings",
        items: [
            { label: "Preferences", disabled: true, icon: Settings },
            { label: "API Keys", disabled: true, icon: Star },
        ],
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [toastMsg, setToastMsg] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(null), 2500);
    };

    return (
        <>
            {/* Mobile Header Toggle */}
            <div className="md:hidden sticky top-0 z-50 flex items-center justify-between p-4 bg-[var(--bg-deep)] border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
                        <Zap size={16} color="#fff" />
                    </div>
                    <span
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "var(--text-primary)",
                        }}
                    >
                        Antigravity
                    </span>
                </div>
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="p-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-glass)]"
                >
                    {mobileOpen ? <X size={20} color="white" /> : <Menu size={20} color="white" />}
                </button>
            </div>

            <motion.aside
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`sidebar ${mobileOpen ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[260px] md:min-w-[260px] h-auto md:h-screen fixed md:sticky top-[73px] md:top-0 z-40 overflow-y-auto`}
                style={{
                    borderRight: "1px solid var(--border-subtle)",
                    borderBottom: "1px solid var(--border-subtle)",
                    background: "var(--bg-glass)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    padding: "24px 16px",
                    gap: "8px",
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "8px 12px",
                        marginBottom: "8px",
                    }}
                >
                    <div
                        style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 4px 16px rgba(255, 109, 90, 0.3)",
                        }}
                    >
                        <Zap size={18} color="#fff" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "18px",
                                fontWeight: 700,
                                color: "var(--text-primary)",
                                lineHeight: 1.2,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Antigravity
                        </h1>
                        <p
                            style={{
                                fontSize: "11px",
                                color: "var(--text-muted)",
                                fontWeight: 500,
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                            }}
                        >
                            Command Center
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div
                    style={{
                        height: "1px",
                        background: "var(--border-subtle)",
                        margin: "4px 12px 12px",
                    }}
                />

                {/* Nav Groups */}
                {navItems.map((group) => (
                    <div key={group.group} style={{ marginBottom: "16px" }}>
                        <p
                            style={{
                                fontSize: "10px",
                                fontWeight: 600,
                                color: "var(--text-muted)",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                padding: "0 12px",
                                marginBottom: "6px",
                            }}
                        >
                            {group.group}
                        </p>
                        {group.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = item.href
                                ? pathname === item.href
                                : false;

                            const buttonContent = (
                                <motion.div
                                    onClick={() => {
                                        if (item.disabled) showToast("Feature coming soon!");
                                    }}
                                    whileHover={!item.disabled ? { x: 2 } : {}}
                                    whileTap={!item.disabled ? { scale: 0.98 } : {}}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        width: "100%",
                                        padding: "10px 12px",
                                        borderRadius: "var(--radius-sm)",
                                        border: "none",
                                        cursor: item.disabled ? "not-allowed" : "pointer",
                                        background: isActive
                                            ? "var(--bg-glass-hover)"
                                            : "transparent",
                                        color: isActive
                                            ? "var(--text-primary)"
                                            : item.disabled
                                                ? "var(--text-muted)"
                                                : "var(--text-secondary)",
                                        fontSize: "13px",
                                        fontWeight: isActive ? 600 : 400,
                                        fontFamily: "inherit",
                                        transition: "all var(--duration-fast) ease",
                                        opacity: item.disabled ? 0.5 : 1,
                                        position: "relative",
                                        textDecoration: "none",
                                    }}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            style={{
                                                position: "absolute",
                                                left: "0",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                width: "3px",
                                                height: "16px",
                                                borderRadius: "0 3px 3px 0",
                                                background: "var(--primary)",
                                            }}
                                        />
                                    )}
                                    <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                                    <span>{item.label}</span>
                                    {item.disabled && (
                                        <span
                                            style={{
                                                marginLeft: "auto",
                                                fontSize: "9px",
                                                fontWeight: 600,
                                                color: "var(--text-muted)",
                                                background: "var(--bg-elevated)",
                                                padding: "2px 6px",
                                                borderRadius: "4px",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.04em",
                                            }}
                                        >
                                            Soon
                                        </span>
                                    )}
                                    {item.href === "/mcp-store" && !item.disabled && (
                                        <span
                                            style={{
                                                marginLeft: "auto",
                                                fontSize: "9px",
                                                fontWeight: 700,
                                                color: "var(--secondary)",
                                                background: "var(--secondary-glow)",
                                                padding: "2px 6px",
                                                borderRadius: "4px",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.04em",
                                            }}
                                        >
                                            New
                                        </span>
                                    )}
                                </motion.div>
                            );

                            if (item.href && !item.disabled) {
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        style={{ textDecoration: "none" }}
                                    >
                                        {buttonContent}
                                    </Link>
                                );
                            }

                            return (
                                <div key={item.label}>
                                    {buttonContent}
                                </div>
                            );
                        })}
                    </div>
                ))}

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Footer */}
                <div
                    style={{
                        padding: "12px",
                        borderRadius: "var(--radius-md)",
                        background: "var(--bg-glass)",
                        border: "1px solid var(--border-subtle)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "8px",
                        }}
                    >
                        <div
                            style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: "var(--accent-green)",
                                boxShadow: "0 0 8px rgba(16, 185, 129, 0.5)",
                            }}
                        />
                        <span
                            style={{
                                fontSize: "11px",
                                fontWeight: 500,
                                color: "var(--text-secondary)",
                            }}
                        >
                            2 MCP Servers Active
                        </span>
                    </div>
                    <a
                        href="https://modelcontextprotocol.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "12px",
                            color: "var(--secondary)",
                            textDecoration: "none",
                            fontWeight: 500,
                        }}
                    >
                        Learn about MCP <ExternalLink size={12} />
                    </a>
                </div>
                {/* Toast Notification */}
                <AnimatePresence>
                    {toastMsg && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            style={{
                                position: "fixed",
                                bottom: "24px",
                                left: "24px",
                                zIndex: 100,
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "12px 16px",
                                background: "var(--bg-surface)",
                                border: "1px solid var(--border-subtle)",
                                borderRadius: "var(--radius-md)",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                            }}
                        >
                            <Info size={16} style={{ color: "var(--secondary)" }} />
                            <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)" }}>
                                {toastMsg}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.aside>
        </>
    );
}
