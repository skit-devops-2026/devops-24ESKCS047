import React from "react";
import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

const LandingPage = () => {
  return (
    <>
      <div className="landing">
        <PublicNavbar />

        {/* Ambient background glow for visual depth */}
        <div className="hero-ambient-glow" />

        <main className="landing-content">
          <section className="landing-hero">
            {/* Elegant eyebrow tag */}
            <div className="hero-pill">
              <span className="pill-dot">✦</span>
              <span>The Independent Discourse Platform</span>
            </div>

            {/* Elevated Headline */}
            <h1>
              Your Voice. <span className="hero-accent">Every Issue.</span> One Platform.
            </h1>

            {/* Refined Paragraph */}
            <p>
              Sayso is where real people share honest opinions on the issues that matter —
              local, political, educational, or global. No noise, no filters. Just perspective.
            </p>

            {/* Stylish Call to Action */}
            <div className="hero-action-group">
              <Link to="/auth" className="landing-cta">
                <span>Join the Conversation</span>
                <svg
                  className="cta-arrow"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            {/* Minimalist Trust Indicator */}
            <div className="hero-perks">
              <span>✓ Free to join</span>
              <span className="perk-dot">•</span>
              <span>✓ Civil debates</span>
              <span className="perk-dot">•</span>
              <span>✓ Unfiltered perspectives</span>
            </div>
          </section>
        </main>
      </div>

      <style>{`
        /* ================= Theme Colors & Variables ================= */
        :root {
          --theme-bg: #faf7f2;               /* Warm alabaster canvas */
          --theme-primary: #122b24;          /* Deep midnight pine */
          --theme-primary-hover: #0a1c17;
          --theme-accent: #c89138;           /* Warm champagne gold */
          --theme-accent-gradient: linear-gradient(135deg, #c89138 0%, #dfad59 50%, #b37d2b 100%);
          --theme-text-main: #1c2724;        /* Rich dark slate */
          --theme-text-muted: #5e6d67;       /* Soft editorial grey */
          --theme-border: #e6e0d4;           /* Subtle warm sand border */
        }

        .landing {
          min-height: 100vh;
          background-color: var(--theme-bg);
          color: var(--theme-text-main);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Seamless glass navbar styling */
        .landing .public-navbar {
          background: rgba(250, 247, 242, 0.82) !important;
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--theme-border) !important;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .landing .public-navbar .pn-logo {
          color: var(--theme-primary) !important;
          letter-spacing: -0.02em;
        }

        /* Subtle radial ambient light */
        .hero-ambient-glow {
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 650px;
          height: 420px;
          background: radial-gradient(
            circle,
            rgba(200, 145, 56, 0.12) 0%,
            rgba(18, 43, 36, 0.04) 50%,
            transparent 75%
          );
          pointer-events: none;
          z-index: 0;
          filter: blur(40px);
        }

        /* Hero Container */
        .landing-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .landing-hero {
          max-width: 820px;
          margin: 0 auto;
          padding: 80px 24px 100px;
          text-align: center;
        }

        /* Eyebrow Pill */
        .hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid var(--theme-border);
          padding: 6px 18px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 600;
          color: var(--theme-primary);
          letter-spacing: 0.03em;
          margin-bottom: 28px;
          box-shadow: 0 2px 10px rgba(18, 43, 36, 0.04);
        }

        .pill-dot {
          color: var(--theme-accent);
          font-size: 13px;
        }

        /* Headline */
        .landing-hero h1 {
          font-family: 'Fraunces', serif;
          font-size: 56px;
          line-height: 1.16;
          font-weight: 700;
          color: var(--theme-primary);
          letter-spacing: -0.025em;
        }

        .landing-hero h1 .hero-accent {
          font-style: italic;
          background: var(--theme-accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        /* Paragraph */
        .landing-hero p {
          max-width: 620px;
          margin: 24px auto 38px;
          color: var(--theme-text-muted);
          font-size: 18px;
          line-height: 1.75;
          font-weight: 400;
        }

        /* CTA Button */
        .hero-action-group {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
        }

        .landing-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--theme-primary);
          color: #ffffff !important;
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 12px;
          box-shadow: 0 4px 18px rgba(18, 43, 36, 0.22);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
        }

        .landing-cta:hover {
          background: var(--theme-primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(18, 43, 36, 0.3);
        }

        .cta-arrow {
          transition: transform 0.2s ease;
        }

        .landing-cta:hover .cta-arrow {
          transform: translateX(4px);
        }

        /* Micro Perks Row */
        .hero-perks {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: var(--theme-text-muted);
          font-weight: 500;
        }

        .perk-dot {
          color: var(--theme-border);
          font-size: 14px;
        }

        /* ================= Responsive ================= */
        @media (max-width: 768px) {
          .landing-hero {
            padding: 50px 20px 70px;
          }
          .landing-hero h1 {
            font-size: 38px;
            line-height: 1.25;
          }
          .landing-hero p {
            font-size: 16px;
            margin: 18px auto 30px;
          }
          .landing-cta {
            width: 100%;
            justify-content: center;
            padding: 14px 28px;
          }
          .hero-perks {
            flex-direction: column;
            gap: 6px;
          }
          .perk-dot {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default LandingPage;