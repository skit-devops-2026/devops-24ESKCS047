import React from "react";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <>
      <header className="public-navbar">
        <div className="pn-container">
          <Link to="/" className="pn-brand">
            <span className="pn-crest">✦</span>
            <span className="pn-logo">Sayso</span>
          </Link>

          <nav className="pn-actions">
            <Link to="/auth" state={{ mode: "signup" }} className="pn-cta-btn">
              <span>Sign Up</span>
              <svg
                className="pn-cta-arrow"
                width="15"
                height="15"
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
          </nav>
        </div>
      </header>

      <style>{`
        .public-navbar {
          width: 100%;
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(250, 247, 242, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(230, 224, 212, 0.9);
          transition: all 0.25s ease;
        }

        .pn-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pn-brand {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          transition: transform 0.2s ease;
        }

        .pn-brand:hover {
          transform: translateY(-1px);
        }

        .pn-crest {
          color: #c89138;
          font-size: 18px;
          line-height: 1;
        }

        .pn-logo {
          font-family: 'Fraunces', serif;
          font-size: 26px;
          font-weight: 700;
          color: #122b24;
          letter-spacing: -0.025em;
        }

        .pn-actions {
          display: flex;
          align-items: center;
        }

        .pn-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #122b24;
          color: #ffffff !important;
          padding: 9px 18px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 3px 12px rgba(18, 43, 36, 0.16);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pn-cta-btn:hover {
          background: #091a15;
          transform: translateY(-1.5px);
          box-shadow: 0 5px 18px rgba(18, 43, 36, 0.24);
        }

        .pn-cta-arrow {
          transition: transform 0.2s ease;
        }

        .pn-cta-btn:hover .pn-cta-arrow {
          transform: translateX(3px);
        }

        @media (max-width: 640px) {
          .pn-container {
            padding: 14px 20px;
          }
          .pn-logo {
            font-size: 22px;
          }
          .pn-cta-btn {
            padding: 8px 14px;
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
};

export default PublicNavbar;