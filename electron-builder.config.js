/**
 * electron-builder.config.js
 * B.L.A.S.T. — Architect Layer: Packaging config for macOS .app + .dmg
 */

/** @type {import('electron-builder').Configuration} */
module.exports = {
    appId: "com.angellatorre.commandcenter",
    productName: "Command Center",
    copyright: "© 2026 AntiGravity",

    directories: {
        output: "dist",
        buildResources: "build",
    },

    files: [
        "electron/**/*",
        ".next/**/*",
        "public/**/*",
        "node_modules/**/*",
        "package.json",
        "next.config.mjs",
    ],

    extraResources: [
        { from: ".env", to: ".env", filter: ["**/*"] },
    ],

    mac: {
        category: "public.app-category.finance",
        target: [
            { target: "dmg", arch: ["arm64"] },
            { target: "dir", arch: ["arm64"] },
        ],
        darkModeSupport: true,
        // icon: "build/icon.icns"  // Add a 512x512 .icns here for full icon support
    },

    dmg: {
        title: "Command Center",
        background: null,
        window: { width: 540, height: 380 },
        contents: [
            { x: 150, y: 180, type: "file" },
            { x: 390, y: 180, type: "link", path: "/Applications" },
        ],
    },

    // Tells electron-builder the app uses Next.js — don't touch the .next folder
    asar: false,
};
