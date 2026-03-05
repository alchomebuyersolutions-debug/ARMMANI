import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, Link as LinkIcon, Check } from 'lucide-react';

export default function IntegrationModal({ isOpen, onClose, platform, onConnect }) {
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);

    if (!isOpen) return null;

    const handleConnect = () => {
        setIsConnecting(true);
        // Simulate API verification
        setTimeout(() => {
            setIsConnecting(false);
            onConnect(platform);
            onClose();
        }, 1200);
    };

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    style={{
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '24px',
                        width: '100%',
                        maxWidth: '480px',
                        boxShadow: '0 24px 50px rgba(0,0,0,0.5)',
                        position: 'relative'
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer'
                        }}
                    >
                        <X size={20} />
                    </button>

                    <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', color: 'var(--text-primary)' }}>
                        Connect {platform}
                    </h2>
                    <p style={{ margin: '0 0 24px 0', color: 'var(--text-muted)', fontSize: '14px' }}>
                        Enter your API credentials to allow bots to integrate with {platform}.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                API Key / Client ID
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Key size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="Enter API Key"
                                    style={{
                                        width: '100%',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: '8px',
                                        padding: '10px 10px 10px 36px',
                                        color: 'var(--text-primary)',
                                        fontFamily: 'inherit',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                API Secret / Token
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Key size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="password"
                                    value={apiSecret}
                                    onChange={(e) => setApiSecret(e.target.value)}
                                    placeholder="Enter API Secret"
                                    style={{
                                        width: '100%',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: '8px',
                                        padding: '10px 10px 10px 36px',
                                        color: 'var(--text-primary)',
                                        fontFamily: 'inherit',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleConnect}
                            disabled={isConnecting || (!apiKey && !apiSecret)}
                            style={{
                                background: 'var(--primary)',
                                color: 'var(--primary-foreground)',
                                border: 'none',
                                padding: '12px',
                                borderRadius: '8px',
                                fontWeight: 600,
                                marginTop: '16px',
                                cursor: (isConnecting || (!apiKey && !apiSecret)) ? 'not-allowed' : 'pointer',
                                opacity: (isConnecting || (!apiKey && !apiSecret)) ? 0.7 : 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            {isConnecting ? (
                                <>Verifying connection...</>
                            ) : (
                                <><Check size={18} /> Connect Integration</>
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
