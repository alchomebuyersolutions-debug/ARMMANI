"use client";

import { motion } from "framer-motion";
import { ExternalLink, Layers, Type } from "lucide-react";
import Sidebar from "../components/Sidebar";

const RESOURCES = {
    fonts: [
        { name: "Ideogram AI", url: "https://ideogram.ai/t/explore" },
        { name: "Typewolf", url: "https://www.typewolf.com/" },
        { name: "Fontshare", url: "https://www.fontshare.com/" },
        { name: "Fonts In Use", url: "https://fontsinuse.com/" },
    ],
    design: [
        { name: "Weavy", url: "https://app.weavy.ai/" },
        { name: "Cosmos", url: "https://www.cosmos.so/" },
        { name: "Dribbble", url: "https://dribbble.com/" },
        { name: "CodePen", url: "https://codepen.io/" },
        { name: "21st.dev", url: "https://21st.dev/community/components" },
        { name: "Grok", url: "https://grok.com/" },
        { name: "Spline", url: "https://app.spline.design/" },
    ],
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function ResourcesPage() {
    return (
        <div style={{ display: "flex", minHeight: "100vh", position: "relative" }}>
            <Sidebar />

            <main
                style={{
                    flex: 1,
                    padding: "32px 40px",
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "1100px",
                }}
            >
                <motion.header
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: "32px" }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <Layers size={22} style={{ color: "var(--primary)" }} />
                        <h2
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: "24px",
                                fontWeight: 700,
                                color: "var(--text-primary)",
                                letterSpacing: "-0.03em",
                            }}
                        >
                            3D Design & Fonts
                        </h2>
                    </div>
                    <p style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 400 }}>
                        Quick access to your saved typography and 3D web design resources.
                    </p>
                </motion.header>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "24px",
                    }}
                >
                    {/* FONT RESOURCES */}
                    <motion.div variants={itemVariants}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                            <div
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    borderRadius: "8px",
                                    background: "var(--primary-glow)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Type size={14} style={{ color: "var(--primary)" }} />
                            </div>
                            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>
                                Typography
                            </h3>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {RESOURCES.fonts.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "16px",
                                        background: "var(--bg-glass)",
                                        borderRadius: "12px",
                                        border: "1px solid var(--border-subtle)",
                                        textDecoration: "none",
                                        color: "var(--text-primary)",
                                        transition: "all var(--duration-fast) ease",
                                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.borderColor = "var(--primary)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.borderColor = "var(--border-subtle)";
                                    }}
                                >
                                    <span style={{ fontSize: "14px", fontWeight: 500 }}>{item.name}</span>
                                    <ExternalLink size={14} style={{ color: "var(--text-muted)" }} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* DESIGN RESOURCES */}
                    <motion.div variants={itemVariants}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                            <div
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    borderRadius: "8px",
                                    background: "var(--secondary-glow)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Layers size={14} style={{ color: "var(--secondary)" }} />
                            </div>
                            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>
                                3D UI & Design Tools
                            </h3>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {RESOURCES.design.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "16px",
                                        background: "var(--bg-glass)",
                                        borderRadius: "12px",
                                        border: "1px solid var(--border-subtle)",
                                        textDecoration: "none",
                                        color: "var(--text-primary)",
                                        transition: "all var(--duration-fast) ease",
                                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.borderColor = "var(--secondary)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.borderColor = "var(--border-subtle)";
                                    }}
                                >
                                    <span style={{ fontSize: "14px", fontWeight: 500 }}>{item.name}</span>
                                    <ExternalLink size={14} style={{ color: "var(--text-muted)" }} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}
