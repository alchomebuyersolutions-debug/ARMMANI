export const metadata = {
  title: "Alpha Market — Premium Trading Intelligence",
  description:
    "AI-powered trading execution, real-time market intelligence, and institutional-grade risk management. Experience the future of algorithmic trading.",
  keywords: ["alpha market", "trading", "AI", "algorithmic trading", "fintech", "market intelligence"],
  openGraph: {
    title: "Alpha Market — Premium Trading Intelligence",
    description: "AI-powered trading execution with institutional-grade risk management.",
    type: "website",
  },
};

export default function ShowcaseLayout({ children }) {
  return (
    <div className="showcase-root">
      {children}
    </div>
  );
}
