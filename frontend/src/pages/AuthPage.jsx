import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login({ username: form.username, password: form.password });
      } else {
        if (form.password.length < 6) {
          setError("Password must be at least 6 characters.");
          setLoading(false);
          return;
        }
        await signup({
          fullName: form.fullName,
          username: form.username,
          email: form.email,
          password: form.password,
        });
      }
      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Authentication failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-page">
        {/* Subtle warm ambient lighting */}
        <div className="ambient-glow" />

        <div className="auth-card">
          {/* Top back navigation & Brand */}
          <div className="auth-header">
            <Link to="/" className="back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Home</span>
            </Link>

            <Link to="/" className="auth-logo">
              <span className="logo-spark">✦</span>
              <span>Sayso</span>
            </Link>

            <p className="auth-subtitle">
              {mode === "login"
                ? "Welcome back. Sign in to your account."
                : "Create an account to join the conversation."}
            </p>
          </div>

          {/* Clean Segmented Tab Switcher */}
          <div className="auth-tabs">
            <button
              type="button"
              className={`tab-btn ${mode === "login" ? "active" : ""}`}
              onClick={() => handleModeChange("login")}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`tab-btn ${mode === "signup" ? "active" : ""}`}
              onClick={() => handleModeChange("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="auth-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {mode === "signup" && (
              <>
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    className="form-input"
                    name="fullName"
                    type="text"
                    placeholder="e.g. John Doe"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    className="form-input"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="username">
                {mode === "login" ? "Username or Email" : "Choose Username"}
              </label>
              <input
                id="username"
                className="form-input"
                name="username"
                type="text"
                placeholder={mode === "login" ? "Enter username or email" : "e.g. johndoe"}
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  className="form-input password-input"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={mode === "signup" ? "At least 6 characters" : "Enter password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button className="auth-button" type="submit" disabled={loading}>
              {loading ? (
                <span className="btn-loader">
                  <span className="spinner" />
                  <span>{mode === "login" ? "Signing In..." : "Creating Account..."}</span>
                </span>
              ) : (
                <span>{mode === "login" ? "Sign In" : "Create Account"}</span>
              )}
            </button>
          </form>

          {/* Footer switch */}
          <div className="auth-footer">
            <span>{mode === "login" ? "Don't have an account?" : "Already have an account?"}</span>
            <button
              type="button"
              className="switch-btn"
              onClick={() => handleModeChange(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f6f1;
          padding: 32px 20px;
          position: relative;
          overflow: hidden;
        }

        .ambient-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200, 145, 56, 0.08) 0%, rgba(18, 43, 36, 0.04) 50%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          filter: blur(50px);
          pointer-events: none;
        }

        .auth-card {
          width: 100%;
          max-width: 440px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e7e2d7;
          box-shadow: 0 12px 36px rgba(18, 43, 36, 0.06);
          padding: 36px 32px;
          position: relative;
          z-index: 1;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .auth-header {
          position: relative;
          text-align: center;
          margin-bottom: 24px;
        }

        .back-link {
          position: absolute;
          left: 0;
          top: 2px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          font-weight: 500;
          color: #6b7a74;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: #122b24;
        }

        .auth-logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Fraunces', serif;
          font-size: 30px;
          font-weight: 700;
          color: #122b24;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .logo-spark {
          color: #c89138;
          font-size: 18px;
        }

        .auth-subtitle {
          font-size: 14px;
          color: #6b7a74;
          line-height: 1.4;
        }

        .auth-tabs {
          display: flex;
          background: #f1ede5;
          padding: 4px;
          border-radius: 10px;
          margin-bottom: 22px;
        }

        .tab-btn {
          flex: 1;
          padding: 9px;
          border: none;
          background: transparent;
          border-radius: 7px;
          font-size: 13.5px;
          font-weight: 600;
          color: #6b7a74;
          transition: all 0.2s ease;
        }

        .tab-btn.active {
          background: #ffffff;
          color: #122b24;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
        }

        .auth-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fdf2f2;
          border: 1px solid #f8b4b4;
          color: #9b1c1c;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.4;
          margin-bottom: 18px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 12.5px;
          font-weight: 600;
          color: #4a5a54;
          letter-spacing: 0.02em;
        }

        .form-input {
          width: 100%;
          padding: 11px 14px;
          background: #fcfbf9;
          border: 1.5px solid #ded9cd;
          border-radius: 9px;
          font-size: 14px;
          color: #1c2724;
          font-family: inherit;
          transition: all 0.2s ease;
        }

        .form-input::placeholder {
          color: #a4b0aa;
        }

        .form-input:focus {
          outline: none;
          background: #ffffff;
          border-color: #3e6259;
          box-shadow: 0 0 0 3px rgba(62, 98, 89, 0.12);
        }

        .password-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-input {
          padding-right: 42px;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #8a9992;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
        }

        .password-toggle:hover {
          color: #122b24;
        }

        .auth-button {
          margin-top: 6px;
          padding: 12px;
          background: #122b24;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 3px 12px rgba(18, 43, 36, 0.15);
        }

        .auth-button:hover:not(:disabled) {
          background: #091a15;
          transform: translateY(-1px);
          box-shadow: 0 5px 16px rgba(18, 43, 36, 0.22);
        }

        .auth-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .btn-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .spinner {
          width: 15px;
          height: 15px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .auth-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 22px;
          font-size: 13.5px;
          color: #6b7a74;
        }

        .switch-btn {
          background: none;
          border: none;
          padding: 0;
          font-size: 13.5px;
          font-weight: 700;
          color: #122b24;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
        }

        .switch-btn:hover {
          color: #c89138;
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 28px 20px;
          }
          .back-link span {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default AuthPage;