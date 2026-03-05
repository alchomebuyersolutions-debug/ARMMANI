"use client";

import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import StatsBar from "./components/StatsBar";
import TrustBadges from "./components/TrustBadges";
import BentoMetrics from "./components/BentoMetrics";
import ShowcaseGrid from "./components/ShowcaseGrid";
import HorizontalScrollGallery from "./components/HorizontalScrollGallery";
import PricingCards from "./components/PricingCards";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function ShowcasePage() {
    return (
        <>
            {/* Fixed Navbar */}
            <Navbar />

            {/* 1 — Full-Screen Hero (Pattern 1 + 5) */}
            <HeroSlider />

            {/* 2 — Stats Bar (Pattern 2) */}
            <div id="stats">
                <StatsBar />
            </div>

            {/* 3 — Trust Badges (Pattern 2) */}
            <TrustBadges />

            {/* 4 — Bento Metrics Grid (Pattern 3) */}
            <div id="features">
                <BentoMetrics />
            </div>

            {/* 5 — Showcase Grid + Zoom (Pattern 1) */}
            <div id="showcase">
                <ShowcaseGrid />
            </div>

            {/* 6 — Case Studies Horizontal Scroll (Pattern 4) */}
            <HorizontalScrollGallery />

            {/* 7 — Pricing Cards (Pattern 2 + 5) */}
            <div id="pricing">
                <PricingCards />
            </div>

            {/* 8 — CTA Section (Pattern 1 + 5) */}
            <CTASection />

            {/* Footer */}
            <Footer />
        </>
    );
}
