"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ShaderBackground from "@/components/ui/shader-background";

export default function ChatPage() {
    const [chatMessage, setChatMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([
        { role: "system", content: "Gravity Claw Operational. Alpha Wik linked. How can I assist you?" }
    ]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatMessage.trim()) return;

        setChatHistory([...chatHistory, { role: 'user', content: chatMessage }]);

        // Mock response
        setTimeout(() => {
            setChatHistory(prev => [...prev, {
                role: 'system',
                content: `Ack. Processing command: "${chatMessage}". Simulating response...`
            }]);
        }, 1000);

        setChatMessage("");
    };

    return (
        <div className="flex bg-[var(--bg-deep)] min-h-screen text-[var(--text-primary)] relative">
            <ShaderBackground />
            <Sidebar />

            <main className="flex-1 p-6 md:p-10 ml-0 md:ml-[260px] overflow-y-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "30px",
                        paddingBottom: "20px",
                        borderBottom: "1px solid var(--border-subtle)",
                    }}
                >
                    <div>
                        <h1
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "28px",
                                fontWeight: 700,
                                color: "var(--text-primary)",
                            }}
                        >
                            Gravity Claw AI
                        </h1>
                        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                            Secure communication line to the Gravity Claw algorithmic agent
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        background: "var(--bg-glass)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-lg)",
                        padding: "0",
                        backdropFilter: "blur(12px)",
                        display: "flex",
                        flexDirection: "column",
                        height: "calc(100vh - 180px)",
                        overflow: "hidden"
                    }}
                >
                    {/* Chat Header */}
                    <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.2)" }}>
                        <MessageSquare size={20} style={{ color: "var(--accent-green)" }} />
                        <h2 style={{ margin: 0, fontWeight: 600, fontFamily: "'Outfit', sans-serif", color: "var(--text-primary)", fontSize: "18px" }}>Gravity Claw Agent Interface</h2>
                        <span style={{ marginLeft: "auto", fontSize: "12px", color: "var(--accent-green)", background: "rgba(16, 185, 129, 0.1)", padding: "4px 8px", borderRadius: "12px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>Online</span>
                    </div>

                    {/* Chat History */}
                    <div style={{ flex: 1, overflowY: "auto", padding: "24px 30px", display: "flex", flexDirection: "column", gap: "20px" }}>
                        {chatHistory.map((msg, idx) => (
                            <div key={idx} style={{ display: "flex", justifyContent: msg.role === 'user' ? "flex-end" : "flex-start" }}>
                                <div style={{
                                    maxWidth: "75%",
                                    background: msg.role === 'user' ? "linear-gradient(135deg, var(--primary), var(--secondary))" : "rgba(0,0,0,0.5)",
                                    border: msg.role === 'user' ? "none" : "1px solid var(--border-subtle)",
                                    padding: "14px 20px",
                                    borderRadius: "16px",
                                    borderBottomRightRadius: msg.role === 'user' ? "4px" : "16px",
                                    borderBottomLeftRadius: msg.role === 'system' ? "4px" : "16px",
                                    color: "white",
                                    fontSize: "15px",
                                    lineHeight: "1.5",
                                    fontFamily: msg.role === 'system' ? "monospace" : "inherit",
                                    boxShadow: msg.role === 'user' ? "0 4px 12px rgba(255, 109, 90, 0.2)" : "none"
                                }}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} style={{ padding: "20px 30px", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "16px", background: "rgba(0,0,0,0.2)" }}>
                        <input
                            type="text"
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            placeholder="Message Gravity Claw to adjust parameters, start algos, or ask questions..."
                            style={{
                                flex: 1,
                                background: "rgba(0,0,0,0.3)",
                                border: "1px solid var(--border-subtle)",
                                borderRadius: "var(--radius-md)",
                                padding: "16px 20px",
                                color: "white",
                                outline: "none",
                                fontSize: "15px",
                                fontFamily: "inherit",
                                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)"
                            }}
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={!chatMessage.trim()}
                            style={{
                                background: chatMessage.trim() ? "linear-gradient(135deg, var(--primary), var(--secondary))" : "var(--bg-elevated)",
                                border: chatMessage.trim() ? "none" : "1px solid var(--border-subtle)",
                                borderRadius: "var(--radius-md)",
                                width: "56px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: chatMessage.trim() ? "pointer" : "not-allowed",
                                color: chatMessage.trim() ? "white" : "var(--text-muted)",
                                transition: "all 0.2s"
                            }}
                        >
                            <Send size={20} />
                        </motion.button>
                    </form>
                </motion.div>
            </main>
        </div>
    );
}
