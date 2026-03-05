"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Sparkles,
    Database,
    Globe,
    Shield,
    Zap,
    Filter,
    Grid3X3,
    List,
    ArrowUpRight,
    Download,
    Star,
    CheckCircle2,
    Copy,
    Check,
    X,
    Terminal,
    FileJson,
    ExternalLink,
    Box,
    Layers,
    BookOpen,
    Briefcase,
    Code,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

/* ═══════════════════════════════════════════════
   MCP Server Data
   ═══════════════════════════════════════════════ */

const MCP_SERVERS = [
    {
        id: "alpha-market",
        name: "Alpha Market",
        tagline: "24/7 Web & Market Scraper",
        description:
            "The Alpha Market MCP server leverages Apify to run advanced cheerio scrapers and Google Search scrapers for real-time market data, forex, indices, and gold prices.",
        category: "Web Scraping",
        icon: "apify",
        color: "#9723ED",
        colorGlow: "rgba(151, 35, 237, 0.15)",
        verified: true,
        featured: true,
        stars: 1205,
        installs: "3.2k",
        version: "1.0.0",
        author: "Alpha System",
        license: "MIT",
        capabilities: [
            "Real-time Google search",
            "Cheerio-based scraping",
            "Financial market data",
            "24/7 edge-finding",
            "Market news aggregation",
        ],
        config: {
            command: "npx",
            args: ["-y", "alpha-market-mcp"],
            env: {
                APIFY_API_TOKEN: process.env.APIFY_API_TOKEN || "your_apify_token_here",
            },
        },
        docsUrl: "https://docs.apify.com/",
        repoUrl: "https://github.com/apify/apify-client-js",
        tags: ["apify", "alpha", "market", "finance", "scraping"],
    },
    {
        id: "supabase",
        name: "Supabase",
        tagline: "The open-source Firebase alternative",
        description:
            "Connect your AI assistant to Supabase for database queries, authentication, storage, and real-time subscriptions. Perform CRUD operations, manage users, and interact with your Postgres database directly through natural language.",
        category: "Database",
        icon: "supabase",
        color: "#3ECF8E",
        colorGlow: "rgba(62, 207, 142, 0.15)",
        verified: true,
        featured: true,
        stars: 4847,
        installs: "12.3k",
        version: "1.2.0",
        author: "Supabase",
        license: "MIT",
        capabilities: [
            "Database CRUD operations",
            "User authentication management",
            "Storage file operations",
            "Real-time subscriptions",
            "SQL query execution",
            "Row Level Security management",
        ],
        config: {
            command: "npx",
            args: [
                "-y",
                "@supabase/mcp-server-supabase@latest",
                "--access-token",
                process.env.SUPABASE_ACCESS_TOKEN || "your_supabase_token_here",
            ],
        },
        docsUrl: "https://supabase.com/docs/guides/ai/mcp",
        repoUrl: "https://github.com/supabase/mcp-server-supabase",
        tags: ["database", "postgres", "auth", "storage", "realtime"],
    },
    {
        id: "firecrawl",
        name: "Firecrawl",
        tagline: "Turn websites into LLM-ready data",
        description:
            "Scrape and crawl any website, turning it into clean markdown or structured data optimized for LLMs. Perfect for research, data extraction, and building knowledge bases from web content.",
        category: "Web Scraping",
        icon: "firecrawl",
        color: "#FF6A3D",
        colorGlow: "rgba(255, 106, 61, 0.15)",
        verified: true,
        featured: true,
        stars: 3291,
        installs: "8.7k",
        version: "1.0.3",
        author: "Mendable",
        license: "MIT",
        capabilities: [
            "Full website crawling",
            "Single page scraping",
            "Markdown extraction",
            "Structured data output",
            "JavaScript rendering",
            "Screenshot capture",
        ],
        config: {
            command: "npx",
            args: ["-y", "firecrawl-mcp"],
            env: {
                FIRECRAWL_API_KEY: process.env.FIRECRAWL_API_KEY || "your_firecrawl_key_here",
            },
        },
        docsUrl: "https://docs.firecrawl.dev/mcp",
        repoUrl: "https://github.com/mendableai/firecrawl-mcp",
        tags: ["scraping", "crawling", "markdown", "web", "data-extraction"],
    },
    {
        id: "notion",
        name: "Notion",
        tagline: "Your connected workspace for docs, wikis & projects",
        description:
            "Integrate your AI assistant with Notion to search pages, create and update content, manage databases, and automate your knowledge workflow. Query your workspace, append blocks, and keep everything in sync through natural language.",
        category: "Productivity",
        icon: "notion",
        color: "#FFFFFF",
        colorGlow: "rgba(255, 255, 255, 0.08)",
        verified: true,
        featured: true,
        stars: 5120,
        installs: "15.1k",
        version: "1.4.2",
        author: "Notion",
        license: "MIT",
        capabilities: [
            "Search pages & databases",
            "Create and update pages",
            "Manage database entries",
            "Append block content",
            "Query database filters",
            "Read page properties",
        ],
        config: {
            command: "npx",
            args: ["-y", "@notionhq/notion-mcp-server"],
            env: {
                OPENAPI_MCP_HEADERS: JSON.stringify({
                    Authorization: "Bearer ntn_****",
                    "Notion-Version": "2022-06-28",
                }),
            },
        },
        docsUrl: "https://developers.notion.com/docs/mcp",
        repoUrl: "https://github.com/makenotion/notion-mcp-server",
        tags: ["notion", "docs", "wiki", "database", "productivity", "knowledge-base"],
    },
    {
        id: "github",
        name: "GitHub",
        tagline: "The world's platform for software development",
        description:
            "Connect your AI assistant to GitHub to manage repositories, issues, pull requests, and code reviews. Search code, create branches, review diffs, and automate your development workflow through natural language.",
        category: "Developer Tools",
        icon: "github",
        color: "#8B5CF6",
        colorGlow: "rgba(139, 92, 246, 0.15)",
        verified: true,
        featured: true,
        stars: 8940,
        installs: "22.5k",
        version: "2.1.0",
        author: "GitHub",
        license: "MIT",
        capabilities: [
            "Repository management",
            "Issue & PR creation",
            "Code search & review",
            "Branch operations",
            "File read & write",
            "Actions workflow triggers",
        ],
        config: {
            command: "npx",
            args: ["-y", "@modelcontextprotocol/server-github"],
            env: {
                GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_****",
            },
        },
        docsUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/github",
        repoUrl: "https://github.com/modelcontextprotocol/servers",
        tags: ["github", "git", "code", "repos", "issues", "pull-requests"],
    },
    {
        id: "context7",
        name: "Context7",
        tagline: "Up-to-date docs for any library, instantly",
        description:
            "Context7 resolves library documentation in real-time and feeds version-accurate, up-to-date context directly into your LLM prompts. No more hallucinated APIs or outdated code examples — get the latest docs for any framework or library on demand.",
        category: "AI / ML",
        icon: "context7",
        color: "#00D4AA",
        colorGlow: "rgba(0, 212, 170, 0.15)",
        verified: true,
        featured: true,
        stars: 6750,
        installs: "18.2k",
        version: "1.1.0",
        author: "Context7",
        license: "Apache-2.0",
        capabilities: [
            "Real-time docs resolution",
            "Version-accurate context",
            "Multi-library support",
            "Framework documentation",
            "API reference lookup",
            "Code example extraction",
        ],
        config: {
            command: "npx",
            args: ["-y", "@upstash/context7-mcp@latest"],
        },
        docsUrl: "https://context7.com/docs",
        repoUrl: "https://github.com/upstash/context7",
        tags: ["documentation", "context", "llm", "libraries", "frameworks", "ai"],
    },
    {
        id: "pinecone",
        name: "Pinecone",
        tagline: "Vector database built for AI applications",
        description:
            "Connect your AI assistant to Pinecone for semantic search, vector storage, and retrieval-augmented generation (RAG). Manage indexes, upsert embeddings, query by similarity, and build intelligent search powered by vector embeddings.",
        category: "AI / ML",
        icon: "pinecone",
        color: "#1DB954",
        colorGlow: "rgba(29, 185, 84, 0.15)",
        verified: true,
        featured: false,
        stars: 4210,
        installs: "9.8k",
        version: "1.0.1",
        author: "Pinecone",
        license: "Apache-2.0",
        capabilities: [
            "Vector index management",
            "Embedding upsert & query",
            "Similarity search",
            "Namespace operations",
            "Metadata filtering",
            "RAG pipeline support",
        ],
        config: {
            command: "npx",
            args: ["-y", "@anthropic/pinecone-mcp"],
            env: {
                PINECONE_API_KEY: process.env.PINECONE_API_KEY || "your_pinecone_key_here",
            },
        },
        docsUrl: "https://docs.pinecone.io/guides/operations/mcp",
        repoUrl: "https://github.com/pinecone-io/pinecone-mcp",
        tags: ["vectors", "embeddings", "rag", "search", "ai", "machine-learning"],
    },
];

const CATEGORIES = [
    { label: "All", icon: Grid3X3, value: "all" },
    { label: "Database", icon: Database, value: "Database" },
    { label: "Productivity", icon: Briefcase, value: "Productivity" },
    { label: "Developer Tools", icon: Code, value: "Developer Tools" },
    { label: "Web Scraping", icon: Globe, value: "Web Scraping" },
    { label: "Security", icon: Shield, value: "Security" },
    { label: "AI / ML", icon: Sparkles, value: "AI / ML" },
];

/* ═══════════════════════════════════════════════
   Icon Components (SVG logos)
   ═══════════════════════════════════════════════ */

function SupabaseLogo({ size = 24 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 109 113" fill="none">
            <path
                d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627H99.1935C108.384 40.0627 113.398 51.013 107.191 57.6837L63.7076 110.284Z"
                fill="url(#paint0_linear)"
            />
            <path
                d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627H99.1935C108.384 40.0627 113.398 51.013 107.191 57.6837L63.7076 110.284Z"
                fill="url(#paint1_linear)"
                fillOpacity="0.2"
            />
            <path
                d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C0.83113 72.2922 -4.37399 61.3419 1.83344 54.6712L45.317 2.07103Z"
                fill="#3ECF8E"
            />
            <defs>
                <linearGradient id="paint0_linear" x1="53.9738" y1="54.974" x2="94.1635" y2="71.8295" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#249361" />
                    <stop offset="1" stopColor="#3ECF8E" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="36.1558" y1="30.578" x2="54.4844" y2="65.0806" gradientUnits="userSpaceOnUse">
                    <stop />
                    <stop offset="1" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    );
}

function FirecrawlLogo({ size = 24 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
            <path
                d="M16 2C16 2 6 12 6 20C6 25.5 10.5 30 16 30C21.5 30 26 25.5 26 20C26 12 16 2 16 2Z"
                fill="url(#fire_gradient)"
            />
            <path
                d="M16 10C16 10 11 16 11 21C11 23.8 13.2 26 16 26C18.8 26 21 23.8 21 21C21 16 16 10 16 10Z"
                fill="#FFD54F"
            />
            <defs>
                <linearGradient id="fire_gradient" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF6A3D" />
                    <stop offset="1" stopColor="#FF3D00" />
                </linearGradient>
            </defs>
        </svg>
    );
}

function NotionLogo({ size = 24 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
            <path
                d="M6.5 4.5L21.5 3L25.5 6L25 26L10 28.5L6 25V4.5Z"
                fill="white"
            />
            <path
                d="M6.5 4.5L21.5 3L25.5 6L25 26L10 28.5L6 25V4.5Z"
                stroke="#333"
                strokeWidth="0.5"
            />
            <path
                d="M10 10H20V12H10V10ZM10 14H20V16H10V14ZM10 18H16V20H10V18Z"
                fill="#333"
            />
        </svg>
    );
}

function GitHubLogo({ size = 24 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 2C8.265 2 2 8.265 2 16c0 6.195 4.008 11.427 9.572 13.282.7.133.963-.3.963-.668 0-.332-.013-1.432-.02-2.6-3.894.845-4.716-1.654-4.716-1.654-.637-1.616-1.555-2.047-1.555-2.047-1.272-.868.096-.85.096-.85 1.405.099 2.145 1.443 2.145 1.443 1.25 2.14 3.278 1.521 4.076 1.163.127-.905.489-1.522.89-1.871-3.11-.354-6.381-1.555-6.381-6.92 0-1.529.547-2.779 1.443-3.757-.145-.353-.625-1.776.137-3.703 0 0 1.176-.377 3.853 1.435A13.39 13.39 0 0116 9.02c1.191.006 2.39.161 3.51.473 2.675-1.812 3.849-1.435 3.849-1.435.764 1.927.284 3.35.14 3.703.897.978 1.44 2.228 1.44 3.757 0 5.38-3.275 6.563-6.395 6.908.503.433.95 1.285.95 2.592 0 1.872-.017 3.38-.017 3.838 0 .371.258.808.97.665C25.996 27.42 30 22.192 30 16c0-7.735-6.265-14-14-14z"
                fill="#E2E8F0"
            />
        </svg>
    );
}

function Context7Logo({ size = 24 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" fill="url(#c7_gradient)" />
            <text
                x="16"
                y="21"
                textAnchor="middle"
                fill="#0A0B0F"
                fontSize="14"
                fontWeight="800"
                fontFamily="'Inter', sans-serif"
            >
                C7
            </text>
            <defs>
                <linearGradient id="c7_gradient" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00D4AA" />
                    <stop offset="1" stopColor="#00B894" />
                </linearGradient>
            </defs>
        </svg>
    );
}

function PineconeLogo({ size = 24 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
            <path
                d="M16 3L18.5 8L21 5.5L20 10.5L25 9L21.5 13L27 13.5L22 16L27 18.5L21.5 19L25 23L20 21.5L21 26.5L18.5 24L16 29L13.5 24L11 26.5L12 21.5L7 23L10.5 19L5 18.5L10 16L5 13.5L10.5 13L7 9L12 10.5L11 5.5L13.5 8L16 3Z"
                fill="url(#pine_gradient)"
            />
            <circle cx="16" cy="16" r="4" fill="#0B3D0B" />
            <defs>
                <linearGradient id="pine_gradient" x1="16" y1="3" x2="16" y2="29" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1DB954" />
                    <stop offset="1" stopColor="#0D8A3E" />
                </linearGradient>
            </defs>
        </svg>
    );
}

function ApifyLogo({ size = 24 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" fill="url(#apify_gradient)" />
            <path d="M11 20L15.5 10L20 20M13 16H18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
                <linearGradient id="apify_gradient" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9723ED" />
                    <stop offset="1" stopColor="#B352FF" />
                </linearGradient>
            </defs>
        </svg>
    );
}

function getIcon(iconId, size = 28) {
    switch (iconId) {
        case "supabase":
            return <SupabaseLogo size={size} />;
        case "firecrawl":
            return <FirecrawlLogo size={size} />;
        case "notion":
            return <NotionLogo size={size} />;
        case "github":
            return <GitHubLogo size={size} />;
        case "context7":
            return <Context7Logo size={size} />;
        case "pinecone":
            return <PineconeLogo size={size} />;
        case "apify":
            return <ApifyLogo size={size} />;
        default:
            return <Box size={size} />;
    }
}

/* ═══════════════════════════════════════════════
   Detail Modal
   ═══════════════════════════════════════════════ */

function MCPDetailModal({ server, onClose }) {
    const [copiedField, setCopiedField] = useState(null);

    const fullConfig = {
        mcpServers: {
            [server.id]: server.config,
        },
    };

    const configString = JSON.stringify(fullConfig, null, 2);

    async function handleCopy(text, field) {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch {
            // fallback
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100,
                padding: "24px",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: "100%",
                    maxWidth: "640px",
                    maxHeight: "85vh",
                    overflowY: "auto",
                    background: "var(--bg-surface)",
                    borderRadius: "var(--radius-xl)",
                    border: "1px solid var(--border-subtle)",
                    boxShadow: "0 24px 80px rgba(0, 0, 0, 0.6)",
                }}
            >
                {/* Modal Header */}
                <div
                    style={{
                        padding: "24px 28px 20px",
                        borderBottom: "1px solid var(--border-subtle)",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "16px",
                    }}
                >
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                        <div
                            style={{
                                width: "52px",
                                height: "52px",
                                borderRadius: "var(--radius-md)",
                                background: server.colorGlow,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: `1px solid ${server.color}22`,
                            }}
                        >
                            {getIcon(server.icon, 28)}
                        </div>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <h2
                                    style={{
                                        fontFamily: "'Outfit', sans-serif",
                                        fontSize: "22px",
                                        fontWeight: 700,
                                        color: "var(--text-primary)",
                                        letterSpacing: "-0.02em",
                                    }}
                                >
                                    {server.name}
                                </h2>
                                {server.verified && (
                                    <CheckCircle2
                                        size={16}
                                        style={{ color: server.color }}
                                        fill={server.color}
                                        stroke="var(--bg-surface)"
                                    />
                                )}
                            </div>
                            <p
                                style={{
                                    fontSize: "13px",
                                    color: "var(--text-muted)",
                                    marginTop: "2px",
                                }}
                            >
                                by {server.author} • v{server.version}
                            </p>
                        </div>
                    </div>
                    <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: "var(--bg-glass)",
                            border: "1px solid var(--border-subtle)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "var(--text-muted)",
                            flexShrink: 0,
                        }}
                    >
                        <X size={16} />
                    </motion.button>
                </div>

                {/* Modal Body */}
                <div style={{ padding: "24px 28px" }}>
                    {/* Description */}
                    <p
                        style={{
                            fontSize: "14px",
                            color: "var(--text-secondary)",
                            lineHeight: 1.7,
                            marginBottom: "24px",
                        }}
                    >
                        {server.description}
                    </p>

                    {/* Capabilities */}
                    <div style={{ marginBottom: "24px" }}>
                        <h3
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "var(--text-primary)",
                                marginBottom: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <Zap size={14} style={{ color: server.color }} />
                            Capabilities
                        </h3>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "8px",
                            }}
                        >
                            {server.capabilities.map((cap) => (
                                <div
                                    key={cap}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        fontSize: "12px",
                                        color: "var(--text-secondary)",
                                        padding: "8px 12px",
                                        background: "var(--bg-glass)",
                                        borderRadius: "var(--radius-sm)",
                                        border: "1px solid var(--border-subtle)",
                                    }}
                                >
                                    <CheckCircle2
                                        size={12}
                                        style={{ color: server.color, flexShrink: 0 }}
                                    />
                                    {cap}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Configuration */}
                    <div style={{ marginBottom: "24px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "12px",
                            }}
                        >
                            <h3
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    color: "var(--text-primary)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                <FileJson size={14} style={{ color: server.color }} />
                                Configuration
                            </h3>
                            <motion.button
                                onClick={() => handleCopy(configString, "config")}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    padding: "6px 12px",
                                    borderRadius: "var(--radius-sm)",
                                    border: "1px solid var(--border-subtle)",
                                    background:
                                        copiedField === "config"
                                            ? "rgba(16, 185, 129, 0.15)"
                                            : "var(--bg-glass)",
                                    color:
                                        copiedField === "config"
                                            ? "var(--accent-green)"
                                            : "var(--text-secondary)",
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    fontFamily: "inherit",
                                    transition: "all 150ms ease",
                                }}
                            >
                                {copiedField === "config" ? (
                                    <>
                                        <Check size={12} /> Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy size={12} /> Copy Config
                                    </>
                                )}
                            </motion.button>
                        </div>

                        {/* Code Block */}
                        <div
                            style={{
                                background: "var(--bg-deep)",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border-subtle)",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "10px 16px",
                                    borderBottom: "1px solid var(--border-subtle)",
                                    background: "var(--bg-glass)",
                                }}
                            >
                                <Terminal size={12} style={{ color: "var(--text-muted)" }} />
                                <span
                                    style={{
                                        fontSize: "11px",
                                        color: "var(--text-muted)",
                                        fontWeight: 500,
                                    }}
                                >
                                    mcp_config.json
                                </span>
                            </div>
                            <pre
                                style={{
                                    padding: "16px",
                                    margin: 0,
                                    fontSize: "12px",
                                    lineHeight: 1.6,
                                    color: "var(--text-secondary)",
                                    fontFamily:
                                        "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
                                    overflowX: "auto",
                                    whiteSpace: "pre",
                                }}
                            >
                                <code>{configString}</code>
                            </pre>
                        </div>
                    </div>

                    {/* Quick Install Command */}
                    <div style={{ marginBottom: "24px" }}>
                        <h3
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "var(--text-primary)",
                                marginBottom: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <Terminal size={14} style={{ color: server.color }} />
                            Quick Install
                        </h3>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "12px 16px",
                                background: "var(--bg-deep)",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border-subtle)",
                            }}
                        >
                            <span style={{ color: server.color, fontSize: "13px" }}>$</span>
                            <code
                                style={{
                                    flex: 1,
                                    fontSize: "12px",
                                    color: "var(--text-secondary)",
                                    fontFamily:
                                        "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
                                }}
                            >
                                {server.config.command} {server.config.args.join(" ")}
                            </code>
                            <motion.button
                                onClick={() =>
                                    handleCopy(
                                        `${server.config.command} ${server.config.args.join(" ")}`,
                                        "install"
                                    )
                                }
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color:
                                        copiedField === "install"
                                            ? "var(--accent-green)"
                                            : "var(--text-muted)",
                                    padding: "4px",
                                    display: "flex",
                                }}
                            >
                                {copiedField === "install" ? (
                                    <Check size={14} />
                                ) : (
                                    <Copy size={14} />
                                )}
                            </motion.button>
                        </div>
                    </div>

                    {/* Tags */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "6px",
                            marginBottom: "24px",
                        }}
                    >
                        {server.tags.map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    color: "var(--text-muted)",
                                    background: "var(--bg-elevated)",
                                    padding: "4px 10px",
                                    borderRadius: "var(--radius-sm)",
                                    border: "1px solid var(--border-subtle)",
                                }}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: "flex", gap: "10px" }}>
                        <motion.a
                            href={server.docsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                padding: "12px 20px",
                                borderRadius: "var(--radius-md)",
                                border: "none",
                                background: `linear-gradient(135deg, ${server.color}, ${server.color}CC)`,
                                color: "#fff",
                                fontSize: "13px",
                                fontWeight: 600,
                                cursor: "pointer",
                                fontFamily: "inherit",
                                textDecoration: "none",
                                boxShadow: `0 4px 20px ${server.color}40`,
                            }}
                        >
                            <ExternalLink size={14} />
                            View Docs
                        </motion.a>
                        <motion.a
                            href={server.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                padding: "12px 20px",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border-subtle)",
                                background: "var(--bg-glass)",
                                color: "var(--text-primary)",
                                fontSize: "13px",
                                fontWeight: 600,
                                cursor: "pointer",
                                fontFamily: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <ArrowUpRight size={14} />
                            GitHub
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════
   MCP Card Component
   ═══════════════════════════════════════════════ */

function MCPCard({ server, index, onSelect }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => onSelect(server)}
            style={{
                background: "var(--bg-glass)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-subtle)",
                padding: "24px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 300ms ease, box-shadow 300ms ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${server.color}33`;
                e.currentTarget.style.boxShadow = `0 8px 40px ${server.color}15`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            {/* Featured badge */}
            {server.featured && (
                <div
                    style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "3px 8px",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--primary-glow)",
                        border: "1px solid rgba(255, 109, 90, 0.2)",
                    }}
                >
                    <Sparkles size={10} style={{ color: "var(--primary)" }} />
                    <span
                        style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            color: "var(--primary)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                        }}
                    >
                        Featured
                    </span>
                </div>
            )}

            {/* Icon */}
            <div
                style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-md)",
                    background: server.colorGlow,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                    border: `1px solid ${server.color}18`,
                }}
            >
                {getIcon(server.icon, 26)}
            </div>

            {/* Name + Verified */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                }}
            >
                <h3
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.02em",
                    }}
                >
                    {server.name}
                </h3>
                {server.verified && (
                    <CheckCircle2
                        size={14}
                        style={{ color: server.color }}
                        fill={server.color}
                        stroke="var(--bg-deep)"
                    />
                )}
            </div>

            {/* Tagline */}
            <p
                style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    marginBottom: "16px",
                    lineHeight: 1.5,
                }}
            >
                {server.tagline}
            </p>

            {/* Meta row */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                }}
            >
                <span
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                    }}
                >
                    <Star size={11} style={{ color: "var(--accent-amber)" }} />
                    {server.stars.toLocaleString()}
                </span>
                <span
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                    }}
                >
                    <Download size={11} />
                    {server.installs}
                </span>
                <span
                    style={{
                        marginLeft: "auto",
                        padding: "2px 8px",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--bg-elevated)",
                        fontWeight: 500,
                        fontSize: "10px",
                    }}
                >
                    {server.category}
                </span>
            </div>

            {/* Tags */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "4px",
                    marginTop: "14px",
                }}
            >
                {server.tags.slice(0, 3).map((tag) => (
                    <span
                        key={tag}
                        style={{
                            fontSize: "10px",
                            fontWeight: 500,
                            color: "var(--text-muted)",
                            background: "var(--bg-elevated)",
                            padding: "2px 8px",
                            borderRadius: "4px",
                        }}
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════
   Main Store Page
   ═══════════════════════════════════════════════ */

export default function MCPStorePage() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedServer, setSelectedServer] = useState(null);

    const filteredServers = useMemo(() => {
        return MCP_SERVERS.filter((s) => {
            const matchesSearch =
                search === "" ||
                s.name.toLowerCase().includes(search.toLowerCase()) ||
                s.tagline.toLowerCase().includes(search.toLowerCase()) ||
                s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
            const matchesCategory =
                activeCategory === "all" || s.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [search, activeCategory]);

    return (
        <div
            className="flex flex-col md:flex-row"
            style={{
                minHeight: "100vh",
                position: "relative",
            }}
        >
            <Sidebar activeTab="mcp-store" />

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    padding: "32px 40px",
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "1100px",
                }}
            >
                {/* Hero Header */}
                <motion.header
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: "32px" }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "8px",
                        }}
                    >
                        <div
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "10px",
                                background:
                                    "linear-gradient(135deg, var(--secondary), #8B5CF6)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 4px 16px rgba(99, 102, 241, 0.3)",
                            }}
                        >
                            <Layers size={18} color="#fff" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: "26px",
                                    fontWeight: 800,
                                    color: "var(--text-primary)",
                                    letterSpacing: "-0.03em",
                                    lineHeight: 1.2,
                                }}
                            >
                                MCP Store
                            </h1>
                        </div>
                    </div>
                    <p
                        style={{
                            fontSize: "14px",
                            color: "var(--text-muted)",
                            maxWidth: "500px",
                            lineHeight: 1.6,
                            marginLeft: "48px",
                        }}
                    >
                        Discover and install Model Context Protocol servers to supercharge
                        your AI assistant with external tools and data sources.
                    </p>
                </motion.header>

                {/* Search + Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: "28px" }}
                >
                    {/* Search Bar */}
                    <div
                        style={{
                            position: "relative",
                            marginBottom: "16px",
                        }}
                    >
                        <Search
                            size={16}
                            style={{
                                position: "absolute",
                                left: "16px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "var(--text-muted)",
                                pointerEvents: "none",
                            }}
                        />
                        <input
                            id="mcp-search"
                            type="text"
                            placeholder="Search MCP servers..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "14px 16px 14px 44px",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border-subtle)",
                                background: "var(--bg-glass)",
                                color: "var(--text-primary)",
                                fontSize: "14px",
                                fontFamily: "inherit",
                                outline: "none",
                                transition: "border-color 200ms ease, box-shadow 200ms ease",
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "var(--secondary)";
                                e.target.style.boxShadow =
                                    "0 0 0 3px rgba(99, 102, 241, 0.15)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "var(--border-subtle)";
                                e.target.style.boxShadow = "none";
                            }}
                        />
                    </div>

                    {/* Category Chips */}
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                        }}
                    >
                        {CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.value;
                            return (
                                <motion.button
                                    key={cat.value}
                                    onClick={() => setActiveCategory(cat.value)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        padding: "8px 14px",
                                        borderRadius: "var(--radius-sm)",
                                        border: isActive
                                            ? "1px solid var(--secondary)"
                                            : "1px solid var(--border-subtle)",
                                        background: isActive
                                            ? "var(--secondary-glow)"
                                            : "var(--bg-glass)",
                                        color: isActive
                                            ? "var(--text-primary)"
                                            : "var(--text-secondary)",
                                        fontSize: "12px",
                                        fontWeight: isActive ? 600 : 400,
                                        cursor: "pointer",
                                        fontFamily: "inherit",
                                        transition: "all 150ms ease",
                                    }}
                                >
                                    <Icon size={13} />
                                    {cat.label}
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Results Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                    }}
                >
                    <p
                        style={{
                            fontSize: "12px",
                            color: "var(--text-muted)",
                            fontWeight: 500,
                        }}
                    >
                        {filteredServers.length} server{filteredServers.length !== 1 && "s"}{" "}
                        available
                    </p>
                </motion.div>

                {/* Server Grid */}
                <div style={{ minHeight: "400px" }}>
                    <AnimatePresence mode="wait">
                        {filteredServers.length > 0 ? (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                                {filteredServers.map((server, index) => (
                                    <MCPCard
                                        key={server.id}
                                        server={server}
                                        index={index}
                                        onSelect={setSelectedServer}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "80px 40px",
                                    textAlign: "center",
                                    background: "var(--bg-glass)",
                                    borderRadius: "var(--radius-lg)",
                                    border: "1px solid var(--border-subtle)",
                                }}
                            >
                                <Search
                                    size={32}
                                    style={{ color: "var(--text-muted)", marginBottom: "16px" }}
                                />
                                <h3
                                    style={{
                                        fontFamily: "'Outfit', sans-serif",
                                        fontSize: "18px",
                                        fontWeight: 600,
                                        color: "var(--text-primary)",
                                        marginBottom: "8px",
                                    }}
                                >
                                    No servers found
                                </h3>
                                <p
                                    style={{
                                        fontSize: "13px",
                                        color: "var(--text-muted)",
                                        maxWidth: "300px",
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Try adjusting your search or filter to find what you&apos;re
                                    looking for.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Coming Soon Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        marginTop: "40px",
                        padding: "24px 28px",
                        borderRadius: "var(--radius-lg)",
                        background:
                            "linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08))",
                        border: "1px solid rgba(99, 102, 241, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >
                    <div
                        style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "var(--radius-md)",
                            background: "var(--secondary-glow)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <Sparkles size={20} style={{ color: "var(--secondary)" }} />
                    </div>
                    <div>
                        <h4
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: "15px",
                                fontWeight: 700,
                                color: "var(--text-primary)",
                                marginBottom: "4px",
                            }}
                        >
                            More servers coming soon
                        </h4>
                        <p
                            style={{
                                fontSize: "12px",
                                color: "var(--text-muted)",
                                lineHeight: 1.5,
                            }}
                        >
                            We&apos;re adding GitHub, Stripe, Notion, Slack, and more MCP
                            servers. Stay tuned for updates.
                        </p>
                    </div>
                </motion.div>
            </main>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedServer && (
                    <MCPDetailModal
                        server={selectedServer}
                        onClose={() => setSelectedServer(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
