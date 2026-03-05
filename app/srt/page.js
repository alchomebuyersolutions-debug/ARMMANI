"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Gauge, Zap, Timer, Fuel, ChevronDown, ArrowRight, Menu } from "lucide-react";
import Image from "next/image";

/* ─── Spec Data ─── */
const SPECS = [
    { icon: Gauge, value: "475", unit: "HP", label: "Horsepower" },
    { icon: Zap, value: "470", unit: "LB-FT", label: "Torque" },
    { icon: Timer, value: "4.4", unit: "SEC", label: "0-60 MPH" },
    { icon: Fuel, value: "6.4L", unit: "V8", label: "HEMI Engine" },
];

/* ─── 3D Parallax Mouse Tracker ─── */
function use3DParallax(intensity = 15) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 100, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 100, damping: 20 });

    const handleMouse = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return { rotateX, rotateY, handleMouse, handleLeave };
}

/* ─── Main Component ─── */
export default function SRTPage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
    const { rotateX, rotateY, handleMouse, handleLeave } = use3DParallax(12);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            style={{
                background: "#0A0A0A",
                color: "#FFFFFF",
                fontFamily: "'Inter', system-ui, sans-serif",
                overflowX: "hidden",
                minHeight: "100vh",
            }}
        >
            {/* ═══ Navbar ═══ */}
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    padding: "16px 32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "rgba(10, 10, 10, 0.6)",
                    backdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
            >
                <span
                    style={{
                        fontSize: "20px",
                        fontWeight: 800,
                        fontFamily: "'Outfit', sans-serif",
                        letterSpacing: "-0.02em",
                    }}
                >
                    ARMANZALEZB<span style={{ color: "#CA8A04" }}> LLC</span>
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                    {["Performance", "Design", "Technology", "Configure"].map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            style={{
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.5)",
                                textDecoration: "none",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => { e.target.style.color = "#CA8A04"; }}
                            onMouseLeave={(e) => { e.target.style.color = "rgba(255,255,255,0.5)"; }}
                        >
                            {link}
                        </a>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            background: "linear-gradient(135deg, #CA8A04, #A16207)",
                            color: "#fff",
                            border: "none",
                            padding: "10px 22px",
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: 700,
                            cursor: "pointer",
                            letterSpacing: "0.04em",
                            boxShadow: "0 2px 16px rgba(202,138,4,0.25)",
                        }}
                    >
                        RESERVE NOW
                    </motion.button>
                </div>
            </motion.nav>

            {/* ═══ Hero Section ═══ */}
            <section
                ref={heroRef}
                onMouseMove={handleMouse}
                onMouseLeave={handleLeave}
                style={{
                    position: "relative",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    perspective: "1200px",
                }}
            >
                {/* Ambient glow */}
                <div
                    style={{
                        position: "absolute",
                        width: "600px",
                        height: "400px",
                        background: "radial-gradient(ellipse, rgba(202,138,4,0.08) 0%, transparent 70%)",
                        top: "30%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        filter: "blur(60px)",
                        pointerEvents: "none",
                    }}
                />

                {/* Floor reflection gradient */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "40%",
                        background: "linear-gradient(to top, rgba(202,138,4,0.03), transparent)",
                        pointerEvents: "none",
                    }}
                />

                {/* Car container with 3D transforms */}
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        y: heroY,
                        opacity: heroOpacity,
                        scale: heroScale,
                        transformStyle: "preserve-3d",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 40 }}
                        animate={loaded ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: "relative",
                            width: "min(80vw, 900px)",
                            aspectRatio: "1/1",
                        }}
                    >
                        <Image
                            src="/srt-jeep.png"
                            alt="Jeep Grand Cherokee SRT"
                            fill
                            priority
                            style={{
                                objectFit: "contain",
                                filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.6))",
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* Hero Text Overlay */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                        zIndex: 2,
                    }}
                >
                    {/* Top tag */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={loaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        style={{
                            position: "absolute",
                            top: "120px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: "#CA8A04",
                            }}
                        >
                            Grand Cherokee
                        </span>
                        <h1
                            style={{
                                fontSize: "clamp(56px, 10vw, 120px)",
                                fontWeight: 900,
                                fontFamily: "'Outfit', sans-serif",
                                letterSpacing: "-0.05em",
                                lineHeight: 0.9,
                                textAlign: "center",
                                color: "rgba(255,255,255,0.08)",
                            }}
                        >
                            SRT
                        </h1>
                    </motion.div>

                    {/* Bottom tagline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={loaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        style={{
                            position: "absolute",
                            bottom: "120px",
                            textAlign: "center",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "16px",
                                color: "rgba(255,255,255,0.45)",
                                fontWeight: 400,
                                letterSpacing: "0.04em",
                                marginBottom: "20px",
                            }}
                        >
                            6.4L HEMI V8 · 475 HP · All-Wheel Drive
                        </p>
                        <p
                            style={{
                                fontSize: "13px",
                                color: "rgba(255,255,255,0.25)",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                            }}
                        >
                            Starting at $73,745
                        </p>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={loaded ? { opacity: 1 } : {}}
                    transition={{ delay: 2 }}
                    style={{
                        position: "absolute",
                        bottom: "24px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "4px",
                        color: "rgba(255,255,255,0.2)",
                    }}
                >
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ChevronDown size={18} />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══ Specs Section ═══ */}
            <section id="performance" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: "center", marginBottom: "56px" }}
                >
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#CA8A04" }}>
                        Performance
                    </span>
                    <h2
                        style={{
                            fontSize: "clamp(32px, 5vw, 52px)",
                            fontWeight: 800,
                            fontFamily: "'Outfit', sans-serif",
                            letterSpacing: "-0.03em",
                            marginTop: "12px",
                            color: "#fff",
                        }}
                    >
                        Raw Power.{" "}
                        <span style={{ color: "rgba(255,255,255,0.2)" }}>Refined Control.</span>
                    </h2>
                </motion.div>

                {/* Spec Cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {SPECS.map((spec, i) => {
                        const Icon = spec.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                style={{
                                    background: "#1A1A1A",
                                    border: "1px solid #333",
                                    borderRadius: "16px",
                                    padding: "32px 28px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    gap: "12px",
                                    cursor: "default",
                                    transition: "border-color 0.3s, box-shadow 0.3s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(202,138,4,0.3)";
                                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(202,138,4,0.08)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "#333";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                <div
                                    style={{
                                        background: "rgba(202,138,4,0.08)",
                                        borderRadius: "12px",
                                        padding: "12px",
                                    }}
                                >
                                    <Icon size={24} style={{ color: "#CA8A04" }} />
                                </div>

                                <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                                    <span
                                        style={{
                                            fontSize: "42px",
                                            fontWeight: 800,
                                            fontFamily: "'Outfit', sans-serif",
                                            letterSpacing: "-0.03em",
                                            color: "#fff",
                                        }}
                                    >
                                        {spec.value}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: 700,
                                            color: "#CA8A04",
                                            letterSpacing: "0.06em",
                                        }}
                                    >
                                        {spec.unit}
                                    </span>
                                </div>

                                <span style={{ fontSize: "13px", color: "#A3A3A3", fontWeight: 500 }}>
                                    {spec.label}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ═══ Design Highlight ═══ */}
            <section
                id="design"
                style={{
                    padding: "120px 24px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Ambient line */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        right: 0,
                        height: "1px",
                        background: "linear-gradient(90deg, transparent, rgba(202,138,4,0.15), transparent)",
                    }}
                />

                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "80px",
                        alignItems: "center",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#CA8A04" }}>
                            Engineered Aggression
                        </span>
                        <h2
                            style={{
                                fontSize: "clamp(28px, 4vw, 44px)",
                                fontWeight: 800,
                                fontFamily: "'Outfit', sans-serif",
                                letterSpacing: "-0.03em",
                                marginTop: "16px",
                                marginBottom: "20px",
                                lineHeight: 1.1,
                            }}
                        >
                            Dominance Has a{" "}
                            <span style={{ color: "#CA8A04" }}>Shape</span>
                        </h2>
                        <p style={{ fontSize: "15px", color: "#A3A3A3", lineHeight: 1.8, marginBottom: "32px" }}>
                            Every line on the Grand Cherokee SRT is drawn with purpose. From the aggressive front fascia to the
                            quad exhaust tips, this is a vehicle that communicates power before you even turn the key.
                            Brembo brakes. Bilstein shocks. Launch Control. This isn't just an SUV — it's a statement.
                        </p>

                        <div style={{ display: "flex", gap: "16px" }}>
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    background: "linear-gradient(135deg, #CA8A04, #A16207)",
                                    color: "#fff",
                                    border: "none",
                                    padding: "14px 28px",
                                    borderRadius: "10px",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    boxShadow: "0 4px 20px rgba(202,138,4,0.25)",
                                }}
                            >
                                Configure Yours <ArrowRight size={16} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    background: "transparent",
                                    color: "#fff",
                                    border: "1px solid #333",
                                    padding: "14px 28px",
                                    borderRadius: "10px",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Watch Film
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        style={{ position: "relative" }}
                    >
                        <div
                            style={{
                                aspectRatio: "4/3",
                                borderRadius: "20px",
                                background: "#1A1A1A",
                                border: "1px solid #333",
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            <Image
                                src="/srt-jeep.png"
                                alt="Jeep SRT Detail"
                                fill
                                style={{
                                    objectFit: "cover",
                                    objectPosition: "center 60%",
                                    transform: "scale(1.2)",
                                }}
                            />
                            {/* Gradient overlay */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(135deg, rgba(10,10,10,0.3), transparent)",
                                }}
                            />
                        </div>

                        {/* Floating stat badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            style={{
                                position: "absolute",
                                bottom: "-20px",
                                right: "24px",
                                background: "rgba(26, 26, 26, 0.9)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(202,138,4,0.2)",
                                borderRadius: "14px",
                                padding: "16px 24px",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                            }}
                        >
                            <Gauge size={20} style={{ color: "#CA8A04" }} />
                            <div>
                                <div style={{ fontSize: "18px", fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
                                    160 MPH
                                </div>
                                <div style={{ fontSize: "11px", color: "#A3A3A3" }}>Top Speed</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ CTA Banner ═══ */}
            <section
                style={{
                    padding: "100px 24px",
                    textAlign: "center",
                    position: "relative",
                    background: "linear-gradient(to bottom, #0A0A0A, #111 50%, #0A0A0A)",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "500px",
                        height: "300px",
                        transform: "translate(-50%, -50%)",
                        background: "radial-gradient(ellipse, rgba(202,138,4,0.06), transparent 70%)",
                        filter: "blur(60px)",
                        pointerEvents: "none",
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ position: "relative", zIndex: 1 }}
                >
                    <h2
                        style={{
                            fontSize: "clamp(36px, 6vw, 64px)",
                            fontWeight: 900,
                            fontFamily: "'Outfit', sans-serif",
                            letterSpacing: "-0.04em",
                            lineHeight: 1.05,
                            marginBottom: "20px",
                        }}
                    >
                        Command the Road.
                    </h2>
                    <p style={{ fontSize: "16px", color: "#A3A3A3", maxWidth: "480px", margin: "0 auto 36px", lineHeight: 1.7 }}>
                        Schedule a test drive or build your dream SRT from the configurator.
                    </p>
                    <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                background: "linear-gradient(135deg, #CA8A04, #A16207)",
                                color: "#fff",
                                border: "none",
                                padding: "16px 36px",
                                borderRadius: "12px",
                                fontSize: "16px",
                                fontWeight: 700,
                                fontFamily: "'Outfit', sans-serif",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                boxShadow: "0 4px 28px rgba(202,138,4,0.3)",
                            }}
                        >
                            Book Test Drive <ArrowRight size={18} />
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* ═══ Footer ═══ */}
            <footer
                style={{
                    padding: "32px 24px",
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                    textAlign: "center",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.2)",
                }}
            >
                © 2026 ARMANZALEZB LLC. Built with precision.
            </footer>
        </div>
    );
}
