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
    Shield,
    Eye,
    Play,
    MapPin,
    Calendar,
    Activity,
    Check,
    Star,
    Wrench,
} from "lucide-react";
import Image from "next/image";

/* ═══ DATA ═══ */

const VEHICLE_INFO = {
    year: "2021",
    make: "Mercedes-Benz",
    model: "S500",
    trim: "4MATIC",
    price: "$62,900",
    msrp: "$112,150",
    mileage: "110,000",
    vin: "W1K6G7GB3MA******",
    ext: "Obsidian Black Metallic",
    int: "Macchiato Beige / Black Nappa Leather",
    drivetrain: "All-Wheel Drive",
    transmission: "9G-TRONIC Automatic",
    engine: "3.0L Inline-6 Turbo + EQ Boost",
};

const SPECS = [
    { icon: Gauge, value: "429", unit: "HP", label: "Turbo I6 + EQ Boost" },
    { icon: Zap, value: "384", unit: "LB-FT", label: "Peak Torque" },
    { icon: Timer, value: "4.8", unit: "SEC", label: "0-60 MPH" },
    { icon: Activity, value: "110K", unit: "MI", label: "Odometer" },
];

const FEATURES = [
    { icon: Shield, label: "MBUX Hyperscreen" },
    { icon: Star, label: "Burmester 4D Sound" },
    { icon: Eye, label: "Rear Seat Entertainment" },
    { icon: Wrench, label: "Air Suspension" },
    { icon: Shield, label: "Head-Up Display" },
    { icon: Star, label: "Executive Rear Seats" },
    { icon: Eye, label: "Night Vision Assist" },
    { icon: Wrench, label: "Parking Package" },
];

const HISTORY = [
    { date: "Mar 2021", event: "Sold new — authorized dealer", miles: "12 mi" },
    { date: "Sep 2021", event: "Service A — oil, filters, inspection", miles: "10,210 mi" },
    { date: "Jun 2022", event: "Service B — brakes, full fluid flush", miles: "28,450 mi" },
    { date: "Feb 2023", event: "48-month service — suspension check", miles: "52,100 mi" },
    { date: "Nov 2023", event: "New tires — Continental SportContact", miles: "74,800 mi" },
    { date: "Aug 2024", event: "Full detail + ceramic coating", miles: "95,200 mi" },
    { date: "Jan 2025", event: "Pre-sale inspection — passed", miles: "110,000 mi" },
];

/* ═══ HOOKS ═══ */

function use3DParallax(intensity = 10) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 80, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 80, damping: 20 });

    const handleMouse = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [x, y]);

    const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

    return { rotateX, rotateY, handleMouse, handleLeave };
}

/* ═══ PAGE ═══ */

export default function MercedesPage() {
    const [loaded, setLoaded] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const heroRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const { rotateX, rotateY, handleMouse, handleLeave } = use3DParallax(10);

    useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);

    return (
        <div style={{ background: "#0A0A0A", color: "#fff", fontFamily: "'Inter', system-ui, sans-serif", overflowX: "hidden" }}>

            {/* ═══ NAVBAR ═══ */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
                    padding: "14px 32px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "rgba(10,10,10,0.5)", backdropFilter: "blur(24px)",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Image src="/armanzalez-logo.jpg" alt="Armanzalez" width={40} height={40} style={{ borderRadius: "4px", objectFit: "contain" }} />
                    <span style={{ fontSize: "16px", fontWeight: 700, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase", color: "#CA8A04" }}>
                        ARMANZALEZ
                    </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                    {["Inventory", "Finance", "Trade-In", "Contact"].map((l) => (
                        <a key={l} href={`#${l.toLowerCase()}`}
                            style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.4)", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s" }}
                            onMouseEnter={(e) => { e.target.style.color = "#CA8A04"; }}
                            onMouseLeave={(e) => { e.target.style.color = "rgba(255,255,255,0.4)"; }}
                        >{l}</a>
                    ))}
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        style={{ background: "linear-gradient(135deg, #CA8A04, #8B6914)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 2px 16px rgba(202,138,4,0.2)" }}>
                        Inquire
                    </motion.button>
                </div>
            </motion.nav>

            {/* ═══ HERO ═══ */}
            <section ref={heroRef} onMouseMove={handleMouse} onMouseLeave={handleLeave}
                style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", perspective: "1200px", cursor: "grab" }}>

                <div style={{ position: "absolute", width: "700px", height: "500px", background: "radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)", top: "35%", left: "50%", transform: "translate(-50%, -50%)", filter: "blur(80px)", pointerEvents: "none" }} />

                <motion.div style={{ rotateX, rotateY, y: heroY, opacity: heroOpacity, scale: heroScale, transformStyle: "preserve-3d" }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 60 }}
                        animate={loaded ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ position: "relative", width: "min(85vw, 900px)", aspectRatio: "1/1" }}>
                        <Image src="/mercedes-s500.png" alt="Mercedes-Benz S500" fill priority style={{ objectFit: "contain", filter: "drop-shadow(0 50px 100px rgba(0,0,0,0.7))" }} />
                    </motion.div>
                </motion.div>

                {/* Text overlay */}
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", pointerEvents: "none", zIndex: 2 }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}
                        style={{ position: "absolute", top: "100px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#CA8A04" }}>Pre-Owned</span>
                            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>·</span>
                            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)" }}>110,000 Miles</span>
                        </div>
                        <h1 style={{ fontSize: "clamp(40px, 8vw, 100px)", fontWeight: 900, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.05em", lineHeight: 0.85, textAlign: "center", background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            S500
                        </h1>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.2 }}
                        style={{ position: "absolute", bottom: "100px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>
                            2021 · 3.0L Turbo I6 + EQ Boost · 4MATIC AWD
                        </p>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                            <span style={{ fontSize: "32px", fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: "#CA8A04" }}>{VEHICLE_INFO.price}</span>
                            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.2)", textDecoration: "line-through" }}>MSRP {VEHICLE_INFO.msrp}</span>
                        </div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
                            style={{ marginTop: "4px", display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.08em", textTransform: "uppercase", pointerEvents: "auto" }}>
                            <Eye size={12} /> Move mouse to interact
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}} transition={{ delay: 2.5 }}
                    style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 3 }}>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ChevronDown size={18} style={{ color: "rgba(255,255,255,0.15)" }} />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══ SPECS ═══ */}
            <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    style={{ textAlign: "center", marginBottom: "48px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#CA8A04" }}>At A Glance</span>
                    <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.03em", marginTop: "12px" }}>
                        The Numbers <span style={{ color: "rgba(255,255,255,0.15)" }}>Speak.</span>
                    </h2>
                </motion.div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                    {SPECS.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -6, borderColor: "rgba(202,138,4,0.3)" }}
                                style={{ background: "linear-gradient(145deg, #141414, #1A1A1A)", border: "1px solid #222", borderRadius: "16px", padding: "32px 20px", textAlign: "center", transition: "all 0.4s", cursor: "default" }}>
                                <div style={{ background: "rgba(202,138,4,0.06)", borderRadius: "12px", padding: "10px", display: "inline-flex", marginBottom: "14px" }}>
                                    <Icon size={20} style={{ color: "#CA8A04" }} />
                                </div>
                                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "4px" }}>
                                    <span style={{ fontSize: "40px", fontWeight: 800, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.04em" }}>{s.value}</span>
                                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#CA8A04", letterSpacing: "0.06em" }}>{s.unit}</span>
                                </div>
                                <span style={{ fontSize: "12px", color: "#666", fontWeight: 500, marginTop: "4px", display: "block" }}>{s.label}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ═══ VEHICLE DETAILS ═══ */}
            <section style={{ padding: "60px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
                    {/* Left: Details */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#CA8A04" }}>Vehicle Details</span>
                        <h3 style={{ fontSize: "28px", fontWeight: 800, fontFamily: "'Outfit', sans-serif", marginTop: "12px", marginBottom: "24px" }}>
                            2021 Mercedes-Benz S500 4MATIC
                        </h3>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            {[
                                { label: "Exterior", value: VEHICLE_INFO.ext },
                                { label: "Interior", value: VEHICLE_INFO.int },
                                { label: "Drivetrain", value: VEHICLE_INFO.drivetrain },
                                { label: "Transmission", value: VEHICLE_INFO.transmission },
                                { label: "Engine", value: VEHICLE_INFO.engine },
                                { label: "VIN", value: VEHICLE_INFO.vin },
                            ].map((d, i) => (
                                <div key={i} style={{ padding: "14px 16px", background: "#141414", borderRadius: "10px", border: "1px solid #1F1F1F" }}>
                                    <div style={{ fontSize: "10px", fontWeight: 700, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>{d.label}</div>
                                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#ccc" }}>{d.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                        style={{ position: "relative" }}>
                        <div style={{ aspectRatio: "4/3", borderRadius: "20px", background: "#111", border: "1px solid #222", overflow: "hidden", position: "relative" }}>
                            <Image src="/mercedes-s500.png" alt="S500 Detail" fill style={{ objectFit: "contain", padding: "16px" }} />
                        </div>
                        {/* Price badge */}
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                            style={{ position: "absolute", bottom: "-16px", right: "20px", background: "rgba(26,26,26,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(202,138,4,0.2)", borderRadius: "14px", padding: "14px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
                            <Calendar size={18} style={{ color: "#CA8A04" }} />
                            <div>
                                <div style={{ fontSize: "16px", fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>44% OFF</div>
                                <div style={{ fontSize: "10px", color: "#888" }}>vs. Original MSRP</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ FEATURES ═══ */}
            <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    style={{ textAlign: "center", marginBottom: "40px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#CA8A04" }}>Equipment</span>
                    <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.03em", marginTop: "12px" }}>
                        Fully Loaded <span style={{ color: "rgba(255,255,255,0.15)" }}>From Factory.</span>
                    </h2>
                </motion.div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                    {FEATURES.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                                whileHover={{ y: -4, borderColor: "rgba(202,138,4,0.2)" }}
                                style={{ padding: "20px", background: "#141414", borderRadius: "12px", border: "1px solid #1F1F1F", display: "flex", alignItems: "center", gap: "12px", cursor: "default", transition: "all 0.3s" }}>
                                <Check size={16} style={{ color: "#CA8A04", flexShrink: 0 }} />
                                <span style={{ fontSize: "13px", fontWeight: 600, color: "#bbb" }}>{f.label}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ═══ SERVICE HISTORY ═══ */}
            <section style={{ padding: "80px 24px", maxWidth: "800px", margin: "0 auto" }}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    style={{ textAlign: "center", marginBottom: "48px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#CA8A04" }}>Provenance</span>
                    <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.03em", marginTop: "12px" }}>
                        Complete Service{" "}<span style={{ color: "rgba(255,255,255,0.15)" }}>History.</span>
                    </h2>
                </motion.div>

                <div style={{ position: "relative" }}>
                    {/* Timeline line */}
                    <div style={{ position: "absolute", left: "20px", top: "8px", bottom: "8px", width: "2px", background: "linear-gradient(to bottom, #CA8A04, #222)" }} />

                    {HISTORY.map((h, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                            style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "24px", paddingLeft: "8px" }}>
                            {/* Dot */}
                            <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#141414", border: "2px solid #CA8A04", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#CA8A04" }} />
                            </div>
                            <div style={{ flex: 1, padding: "16px 20px", background: "#141414", borderRadius: "12px", border: "1px solid #1F1F1F" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#CA8A04" }}>{h.date}</span>
                                    <span style={{ fontSize: "11px", color: "#555", fontWeight: 600 }}>{h.miles}</span>
                                </div>
                                <p style={{ fontSize: "13px", color: "#999", margin: 0 }}>{h.event}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section style={{ padding: "100px 24px", textAlign: "center", position: "relative" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", width: "600px", height: "400px", transform: "translate(-50%, -50%)", background: "radial-gradient(ellipse, rgba(202,138,4,0.04), transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ position: "relative", zIndex: 1 }}>
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ marginBottom: "20px" }}>
                        <Image src="/armanzalez-mascot.jpg" alt="Armanzalez" width={72} height={72} style={{ borderRadius: "50%", border: "2px solid rgba(202,138,4,0.2)", margin: "0 auto" }} />
                    </motion.div>

                    <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "12px" }}>
                        Drive It Home.
                    </h2>
                    <p style={{ fontSize: "14px", color: "#666", maxWidth: "420px", margin: "0 auto 32px", lineHeight: 1.8 }}>
                        Schedule a test drive, get pre-approved for financing, or make an offer today.
                    </p>

                    <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                            style={{ background: "linear-gradient(135deg, #CA8A04, #8B6914)", color: "#fff", border: "none", padding: "16px 32px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, letterSpacing: "0.04em", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 28px rgba(202,138,4,0.25)" }}>
                            Schedule Test Drive <ArrowRight size={16} />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                            style={{ background: "transparent", color: "#fff", border: "1px solid #333", padding: "16px 32px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
                            Get Pre-Approved
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                            style={{ background: "transparent", color: "#CA8A04", border: "1px solid rgba(202,138,4,0.3)", padding: "16px 32px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
                            Make An Offer
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* ═══ FOOTER ═══ */}
            <footer style={{ padding: "32px 24px", borderTop: "1px solid rgba(255,255,255,0.03)", textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
                    <Image src="/armanzalez-logo.jpg" alt="Armanzalez" width={24} height={24} style={{ borderRadius: "4px", objectFit: "contain" }} />
                    <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#CA8A04" }}>ARMANZALEZ LLC</span>
                </div>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.12)" }}>© 2026 ARMANZALEZ LLC. Pre-Owned Luxury Collection.</p>
            </footer>
        </div>
    );
}
