"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import AnimatedBlob from "./AnimatedBlob";

export default function CTASection() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setEmail("");
        }
    };

    return (
        <section
            style={{
                position: "relative",
                padding: "120px 24px",
                overflow: "hidden",
                background: "var(--sc-primary)",
            }}
        >
            {/* Blobs */}
            <AnimatedBlob color="#CA8A04" size={500} opacity={0.1} className="top-[-20%] right-[-10%]" delay={0} />
            <AnimatedBlob color="#CA8A04" size={400} opacity={0.06} className="bottom-[-15%] left-[-5%]" delay={6} />

            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "1280px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "64px",
                    alignItems: "center",
                }}
            >
                {/* Left — Copy */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span
                        style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "#CA8A04",
                        }}
                    >
                        Get Early Access
                    </span>
                    <h2
                        style={{
                            fontSize: "clamp(32px, 5vw, 52px)",
                            fontWeight: 800,
                            fontFamily: "'Outfit', sans-serif",
                            color: "#FAFAF9",
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                            marginTop: "16px",
                            marginBottom: "16px",
                        }}
                    >
                        Ready to Trade<br />
                        <span style={{ color: "#CA8A04" }}>Smarter?</span>
                    </h2>
                    <p
                        style={{
                            fontSize: "16px",
                            color: "rgba(250, 250, 249, 0.6)",
                            lineHeight: 1.7,
                            maxWidth: "440px",
                        }}
                    >
                        Join 3,200+ traders already using Alpha Market to automate their edge.
                        Start your 14-day free trial — no credit card required.
                    </p>
                </motion.div>

                {/* Right — Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    <div
                        style={{
                            background: "rgba(255, 255, 255, 0.06)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: "20px",
                            padding: "40px",
                        }}
                    >
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    textAlign: "center",
                                    padding: "20px 0",
                                    color: "#FAFAF9",
                                }}
                            >
                                <div style={{ fontSize: "48px", marginBottom: "12px" }}>✓</div>
                                <h3 style={{ fontSize: "20px", fontWeight: 700, fontFamily: "'Outfit', sans-serif", marginBottom: "8px" }}>
                                    You&apos;re In!
                                </h3>
                                <p style={{ fontSize: "14px", color: "rgba(250,250,249,0.6)" }}>
                                    Check your inbox for next steps.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                <label style={{ fontSize: "14px", fontWeight: 600, color: "#FAFAF9" }}>
                                    Enter your email to get started
                                </label>
                                <div style={{ display: "flex", gap: "12px" }}>
                                    <div style={{ flex: 1, position: "relative" }}>
                                        <Mail
                                            size={16}
                                            style={{
                                                position: "absolute",
                                                left: "14px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                color: "rgba(250,250,249,0.3)",
                                            }}
                                        />
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            style={{
                                                width: "100%",
                                                padding: "14px 14px 14px 40px",
                                                borderRadius: "12px",
                                                background: "rgba(255, 255, 255, 0.06)",
                                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                                color: "#FAFAF9",
                                                fontSize: "15px",
                                                fontFamily: "inherit",
                                                outline: "none",
                                                transition: "border-color 0.2s",
                                            }}
                                            onFocus={(e) => { e.target.style.borderColor = "rgba(202,138,4,0.5)"; }}
                                            onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
                                        />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        style={{
                                            background: "linear-gradient(135deg, #CA8A04, #A16207)",
                                            color: "#fff",
                                            border: "none",
                                            padding: "14px 28px",
                                            borderRadius: "12px",
                                            fontSize: "15px",
                                            fontWeight: 700,
                                            fontFamily: "'Outfit', sans-serif",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            boxShadow: "0 4px 20px rgba(202,138,4,0.3)",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Start Free <ArrowRight size={16} />
                                    </motion.button>
                                </div>
                                <p style={{ fontSize: "12px", color: "rgba(250,250,249,0.35)", margin: 0 }}>
                                    Free 14-day trial. No credit card required.
                                </p>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
