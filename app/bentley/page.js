"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
    AnimatePresence,
} from "framer-motion";
import {
    Gauge,
    Zap,
    Timer,
    Fuel,
    ChevronDown,
    ArrowRight,
    Palette,
    Eye,
    Volume2,
    VolumeX,
    Play,
} from "lucide-react";
import Image from "next/image";

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const SPECS = [
    { icon: Gauge, value: "659", unit: "HP", label: "Twin-Turbo W12" },
    { icon: Zap, value: "664", unit: "LB-FT", label: "Peak Torque" },
    { icon: Timer, value: "3.5", unit: "SEC", label: "0-60 MPH" },
    { icon: Fuel, value: "207", unit: "MPH", label: "Top Speed" },
];

const COLORS = [
    { name: "British Racing Green", hex: "#1B4332", active: true },
    { name: "Onyx Black", hex: "#0A0A0A", active: false },
    { name: "Ghost White", hex: "#E8E4E0", active: false },
    { name: "Midnight Sapphire", hex: "#1A1B4B", active: false },
    { name: "Champagne Gold", hex: "#B8860B", active: false },
];

const FEATURES = [
    {
        title: "Naim Audio",
        desc: "2,200-watt, 18-speaker Naim for Bentley audio system — concert hall acoustics at 200mph.",
        stat: "2,200W",
    },
    {
        title: "Diamond Knurling",
        desc: "3D-printed 18K gold diamond knurling on every control surface — 182 individual diamonds.",
        stat: "182",
    },
    {
        title: "Rotating Display",
        desc: "Three-sided rotating center console switches between 12.3\" touchscreen, analog gauges, and clean veneer.",
        stat: "3-in-1",
    },
];

/* ═══════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════ */

function use3DParallax(intensity = 12) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
        stiffness: 80,
        damping: 20,
    });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
        stiffness: 80,
        damping: 20,
    });

    const handleMouse = useCallback(
        (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            x.set((e.clientX - rect.left) / rect.width - 0.5);
            y.set((e.clientY - rect.top) / rect.height - 0.5);
        },
        [x, y]
    );

    const handleLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    return { rotateX, rotateY, handleMouse, handleLeave };
}

function useCountUp(target, inView, duration = 2000) {
    const [count, setCount] = useState(0);
    const hasRun = useRef(false);

    useEffect(() => {
        if (!inView || hasRun.current) return;
        hasRun.current = true;
        const steps = 60;
        const inc = target / steps;
        let cur = 0;
        const timer = setInterval(() => {
            cur += inc;
            if (cur >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(cur);
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [inView, target, duration]);

    return count;
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */

export default function BentleyPage() {
    const [loaded, setLoaded] = useState(false);
    const [selectedColor, setSelectedColor] = useState(0);
    const [activeFeature, setActiveFeature] = useState(0);
    const heroRef = useRef(null);
    const specsRef = useRef(null);
    const [specsInView, setSpecsInView] = useState(false);

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 250]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
    const textY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
    const { rotateX, rotateY, handleMouse, handleLeave } = use3DParallax(10);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 200);
    }, []);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setSpecsInView(true); },
            { threshold: 0.3 }
        );
        if (specsRef.current) obs.observe(specsRef.current);
        return () => obs.disconnect();
    }, []);

    // Auto-cycle features
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveFeature((p) => (p + 1) % FEATURES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div
            style={{
                background: "#0A0A0A",
                color: "#fff",
                fontFamily: "'Inter', system-ui, sans-serif",
                overflowX: "hidden",
            }}
        >
            {/* ═══ NAVBAR ═══ */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    padding: "14px 32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "rgba(10, 10, 10, 0.5)",
                    backdropFilter: "blur(24px)",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                }}
            >
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Image
                        src="/armanzalez-logo.jpg"
                        alt="Armanzalez"
                        width={40}
                        height={40}
                        style={{ borderRadius: "4px", objectFit: "contain" }}
                    />
                    <span
                        style={{
                            fontSize: "16px",
                            fontWeight: 700,
                            fontFamily: "'Outfit', sans-serif",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "#CA8A04",
                        }}
                    >
                        ARMANZALEZ
                    </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                    {["Collection", "Bespoke", "Heritage", "Contact"].map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            style={{
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.4)",
                                textDecoration: "none",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => { e.target.style.color = "#CA8A04"; }}
                            onMouseLeave={(e) => { e.target.style.color = "rgba(255,255,255,0.4)"; }}
                        >
                            {link}
                        </a>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            background: "linear-gradient(135deg, #CA8A04, #8B6914)",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "6px",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            boxShadow: "0 2px 16px rgba(202,138,4,0.2)",
                        }}
                    >
                        Reserve
                    </motion.button>
                </div>
            </motion.nav>

            {/* ═══ HERO ═══ */}
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
                    cursor: "grab",
                }}
            >
                {/* Ambient golden glow */}
                <div
                    style={{
                        position: "absolute",
                        width: "700px",
                        height: "500px",
                        background: "radial-gradient(ellipse, rgba(202,138,4,0.06) 0%, transparent 70%)",
                        top: "35%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        filter: "blur(80px)",
                        pointerEvents: "none",
                    }}
                />

                {/* Floor reflection */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "35%",
                        background: "linear-gradient(to top, rgba(202,138,4,0.02), transparent)",
                        pointerEvents: "none",
                    }}
                />

                {/* 3D Car Container */}
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
                        initial={{ opacity: 0, scale: 0.8, y: 60 }}
                        animate={loaded ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: "relative",
                            width: "min(85vw, 950px)",
                            aspectRatio: "1/1",
                        }}
                    >
                        <Image
                            src="/bentley.png"
                            alt="Bentley Continental GT"
                            fill
                            priority
                            style={{
                                objectFit: "contain",
                                filter: "drop-shadow(0 50px 100px rgba(0,0,0,0.7))",
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* Top Text */}
                <motion.div
                    style={{ y: textY }}
                    className="hero-text-overlay"
                >
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
                            pointerEvents: "none",
                            zIndex: 2,
                        }}
                    >
                        {/* Logo + Name */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={loaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            style={{
                                position: "absolute",
                                top: "100px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "12px",
                            }}
                        >
                            {/* Mascot */}
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Image
                                    src="/armanzalez-mascot.jpg"
                                    alt="Armanzalez Mascot"
                                    width={64}
                                    height={64}
                                    style={{ borderRadius: "50%", border: "2px solid rgba(202,138,4,0.3)" }}
                                />
                            </motion.div>

                            <span
                                style={{
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    letterSpacing: "0.25em",
                                    textTransform: "uppercase",
                                    color: "#CA8A04",
                                }}
                            >
                                ARMANZALEZ LLC presents
                            </span>

                            <h1
                                style={{
                                    fontSize: "clamp(48px, 9vw, 110px)",
                                    fontWeight: 900,
                                    fontFamily: "'Outfit', sans-serif",
                                    letterSpacing: "-0.05em",
                                    lineHeight: 0.85,
                                    textAlign: "center",
                                    background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                CONTINENTAL GT
                            </h1>
                        </motion.div>

                        {/* Bottom tagline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={loaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 1.2, duration: 0.6 }}
                            style={{
                                position: "absolute",
                                bottom: "100px",
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "12px",
                            }}
                        >
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>
                                W12 Twin-Turbo · 659 HP · All-Wheel Drive
                            </p>
                            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                                Starting at $202,500
                            </p>

                            {/* Interactive hint */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.5 }}
                                style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontSize: "11px",
                                    color: "rgba(255,255,255,0.15)",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    pointerEvents: "auto",
                                }}
                            >
                                <Eye size={12} /> Move your mouse to interact
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={loaded ? { opacity: 1 } : {}}
                    transition={{ delay: 2.5 }}
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 3,
                    }}
                >
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ChevronDown size={18} style={{ color: "rgba(255,255,255,0.15)" }} />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══ SPECS ═══ */}
            <section
                id="collection"
                ref={specsRef}
                style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: "center", marginBottom: "60px" }}
                >
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#CA8A04" }}>
                        Performance
                    </span>
                    <h2 style={{
                        fontSize: "clamp(32px, 5vw, 52px)",
                        fontWeight: 800,
                        fontFamily: "'Outfit', sans-serif",
                        letterSpacing: "-0.03em",
                        marginTop: "12px",
                    }}>
                        Extraordinary is{" "}
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>Standard.</span>
                    </h2>
                </motion.div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                    {SPECS.map((spec, i) => {
                        const Icon = spec.icon;
                        const numericValue = parseFloat(spec.value);
                        const count = useCountUp(numericValue, specsInView);
                        const displayValue = Number.isInteger(numericValue) ? Math.floor(count) : count.toFixed(1);

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8, borderColor: "rgba(202,138,4,0.3)" }}
                                style={{
                                    background: "linear-gradient(145deg, #141414, #1A1A1A)",
                                    border: "1px solid #222",
                                    borderRadius: "16px",
                                    padding: "36px 24px",
                                    textAlign: "center",
                                    transition: "all 0.4s ease",
                                    cursor: "default",
                                }}
                            >
                                <div style={{
                                    background: "rgba(202,138,4,0.06)",
                                    borderRadius: "12px",
                                    padding: "12px",
                                    display: "inline-flex",
                                    marginBottom: "16px",
                                }}>
                                    <Icon size={22} style={{ color: "#CA8A04" }} />
                                </div>
                                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "4px" }}>
                                    <span style={{
                                        fontSize: "46px",
                                        fontWeight: 800,
                                        fontFamily: "'Outfit', sans-serif",
                                        letterSpacing: "-0.04em",
                                    }}>
                                        {displayValue}
                                    </span>
                                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#CA8A04", letterSpacing: "0.06em" }}>
                                        {spec.unit}
                                    </span>
                                </div>
                                <span style={{ fontSize: "12px", color: "#666", fontWeight: 500, marginTop: "6px", display: "block" }}>
                                    {spec.label}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ═══ COLOR CONFIGURATOR ═══ */}
            <section
                id="bespoke"
                style={{
                    padding: "100px 24px",
                    position: "relative",
                }}
            >
                <div style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "80px",
                    alignItems: "center",
                }}>
                    {/* Car with color tint */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ position: "relative" }}
                    >
                        <div
                            style={{
                                aspectRatio: "4/3",
                                borderRadius: "20px",
                                overflow: "hidden",
                                position: "relative",
                                background: "#111",
                                border: "1px solid #222",
                            }}
                        >
                            <Image
                                src="/bentley.png"
                                alt="Bentley GT Configurator"
                                fill
                                style={{ objectFit: "contain", padding: "20px" }}
                            />
                            {/* Color overlay tint */}
                            <motion.div
                                key={selectedColor}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.15 }}
                                transition={{ duration: 0.6 }}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: COLORS[selectedColor].hex,
                                    mixBlendMode: "overlay",
                                    borderRadius: "20px",
                                    pointerEvents: "none",
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Configurator Controls */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                    >
                        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#CA8A04" }}>
                            <Palette size={12} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
                            Bespoke Configurator
                        </span>
                        <h2 style={{
                            fontSize: "clamp(28px, 4vw, 40px)",
                            fontWeight: 800,
                            fontFamily: "'Outfit', sans-serif",
                            letterSpacing: "-0.03em",
                            marginTop: "16px",
                            marginBottom: "12px",
                            lineHeight: 1.1,
                        }}>
                            Make It{" "}
                            <span style={{ color: "#CA8A04" }}>Yours</span>
                        </h2>
                        <p style={{ fontSize: "14px", color: "#777", lineHeight: 1.8, marginBottom: "32px" }}>
                            Over 16 billion possible combinations. Choose from our curated palette or work with our Mulliner
                            division to create something never seen before.
                        </p>

                        {/* Color Swatches */}
                        <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
                            {COLORS.map((color, i) => (
                                <motion.button
                                    key={i}
                                    onClick={() => setSelectedColor(i)}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        width: "44px",
                                        height: "44px",
                                        borderRadius: "50%",
                                        background: color.hex,
                                        border: i === selectedColor ? "3px solid #CA8A04" : "2px solid #333",
                                        cursor: "pointer",
                                        boxShadow: i === selectedColor ? "0 0 20px rgba(202,138,4,0.3)" : "none",
                                        transition: "all 0.3s",
                                        outline: "none",
                                    }}
                                    aria-label={color.name}
                                />
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.p
                                key={selectedColor}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                style={{ fontSize: "13px", color: "#CA8A04", fontWeight: 600, letterSpacing: "0.04em" }}
                            >
                                {COLORS[selectedColor].name}
                            </motion.p>
                        </AnimatePresence>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                marginTop: "28px",
                                background: "linear-gradient(135deg, #CA8A04, #8B6914)",
                                color: "#fff",
                                border: "none",
                                padding: "14px 28px",
                                borderRadius: "10px",
                                fontSize: "13px",
                                fontWeight: 700,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                boxShadow: "0 4px 24px rgba(202,138,4,0.2)",
                            }}
                        >
                            Full Configurator <ArrowRight size={16} />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* ═══ FEATURES TABS ═══ */}
            <section
                id="heritage"
                style={{
                    padding: "100px 24px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: "center", marginBottom: "56px" }}
                >
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#CA8A04" }}>
                        Craftsmanship
                    </span>
                    <h2 style={{
                        fontSize: "clamp(28px, 4vw, 44px)",
                        fontWeight: 800,
                        fontFamily: "'Outfit', sans-serif",
                        letterSpacing: "-0.03em",
                        marginTop: "12px",
                    }}>
                        Every Detail,{" "}
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>Perfected.</span>
                    </h2>
                </motion.div>

                {/* Feature Tabs */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "48px", alignItems: "center" }}>
                    {/* Tab List */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {FEATURES.map((feat, i) => (
                            <motion.div
                                key={i}
                                onClick={() => setActiveFeature(i)}
                                whileHover={{ x: 4 }}
                                style={{
                                    padding: "24px",
                                    borderRadius: "14px",
                                    background: i === activeFeature ? "linear-gradient(135deg, rgba(202,138,4,0.06), rgba(26,26,26,0.8))" : "transparent",
                                    border: i === activeFeature ? "1px solid rgba(202,138,4,0.15)" : "1px solid transparent",
                                    cursor: "pointer",
                                    transition: "all 0.3s",
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <h3 style={{
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        fontFamily: "'Outfit', sans-serif",
                                        color: i === activeFeature ? "#fff" : "#555",
                                        transition: "color 0.3s",
                                        margin: 0,
                                    }}>
                                        {feat.title}
                                    </h3>
                                    <span style={{
                                        fontSize: "20px",
                                        fontWeight: 800,
                                        fontFamily: "'Outfit', sans-serif",
                                        color: i === activeFeature ? "#CA8A04" : "#333",
                                        transition: "color 0.3s",
                                    }}>
                                        {feat.stat}
                                    </span>
                                </div>

                                <AnimatePresence>
                                    {i === activeFeature && (
                                        <motion.p
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            style={{
                                                fontSize: "13px",
                                                color: "#777",
                                                lineHeight: 1.7,
                                                marginTop: "10px",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {feat.desc}
                                        </motion.p>
                                    )}
                                </AnimatePresence>

                                {/* Progress bar */}
                                {i === activeFeature && (
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 5, ease: "linear" }}
                                        style={{
                                            height: "2px",
                                            background: "linear-gradient(90deg, #CA8A04, transparent)",
                                            marginTop: "12px",
                                            transformOrigin: "left",
                                            borderRadius: "1px",
                                        }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Feature Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div
                            style={{
                                aspectRatio: "4/3",
                                borderRadius: "20px",
                                background: "linear-gradient(145deg, #141414, #1A1A1A)",
                                border: "1px solid #222",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFeature}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    style={{ textAlign: "center", padding: "40px" }}
                                >
                                    <span style={{
                                        fontSize: "clamp(56px, 8vw, 80px)",
                                        fontWeight: 900,
                                        fontFamily: "'Outfit', sans-serif",
                                        color: "#CA8A04",
                                        letterSpacing: "-0.04em",
                                    }}>
                                        {FEATURES[activeFeature].stat}
                                    </span>
                                    <p style={{
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        fontFamily: "'Outfit', sans-serif",
                                        marginTop: "8px",
                                        color: "#fff",
                                    }}>
                                        {FEATURES[activeFeature].title}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            {/* Decorative gold line */}
                            <div style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: "2px",
                                background: "linear-gradient(90deg, transparent, #CA8A04, transparent)",
                            }} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section
                id="contact"
                style={{
                    padding: "120px 24px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Ambient glow */}
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "600px",
                    height: "400px",
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(ellipse, rgba(202,138,4,0.04), transparent 70%)",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }} />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ position: "relative", zIndex: 1 }}
                >
                    {/* Mascot */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{ marginBottom: "24px" }}
                    >
                        <Image
                            src="/armanzalez-mascot.jpg"
                            alt="Armanzalez"
                            width={80}
                            height={80}
                            style={{ borderRadius: "50%", border: "2px solid rgba(202,138,4,0.2)", margin: "0 auto" }}
                        />
                    </motion.div>

                    <h2 style={{
                        fontSize: "clamp(36px, 6vw, 64px)",
                        fontWeight: 900,
                        fontFamily: "'Outfit', sans-serif",
                        letterSpacing: "-0.04em",
                        lineHeight: 1.05,
                        marginBottom: "16px",
                    }}>
                        Experience Extraordinary.
                    </h2>
                    <p style={{ fontSize: "15px", color: "#666", maxWidth: "440px", margin: "0 auto 40px", lineHeight: 1.8 }}>
                        Schedule a private viewing at our showroom or build your bespoke Continental GT
                        with our Mulliner specialists.
                    </p>

                    <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                background: "linear-gradient(135deg, #CA8A04, #8B6914)",
                                color: "#fff",
                                border: "none",
                                padding: "16px 36px",
                                borderRadius: "10px",
                                fontSize: "14px",
                                fontWeight: 700,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                boxShadow: "0 4px 28px rgba(202,138,4,0.25)",
                            }}
                        >
                            Book Viewing <ArrowRight size={16} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                background: "transparent",
                                color: "#fff",
                                border: "1px solid #333",
                                padding: "16px 36px",
                                borderRadius: "10px",
                                fontSize: "14px",
                                fontWeight: 600,
                                letterSpacing: "0.04em",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <Play size={14} /> Watch Film
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* ═══ FOOTER ═══ */}
            <footer style={{
                padding: "40px 24px",
                borderTop: "1px solid rgba(255,255,255,0.03)",
                textAlign: "center",
            }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "12px" }}>
                    <Image
                        src="/armanzalez-logo.jpg"
                        alt="Armanzalez"
                        width={28}
                        height={28}
                        style={{ borderRadius: "4px", objectFit: "contain" }}
                    />
                    <span style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#CA8A04",
                    }}>
                        ARMANZALEZ LLC
                    </span>
                </div>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.15)" }}>
                    © 2026 ARMANZALEZ LLC. Luxury Automotive Collection.
                </p>
            </footer>
        </div>
    );
}
