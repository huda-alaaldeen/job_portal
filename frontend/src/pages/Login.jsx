import { useState } from "react";

import "./Login.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const response = await api.post("/login", formData);

      localStorage.setItem("token", response.data.token);

      setAlert({
        type: "success",
        message: "Login successful! Welcome back! 🎉",
      });


        navigate("/job-search");

    } catch (error) {
      setAlert({
        type: "error",
        message:
          error.response?.data?.message ||
          "Invalid credentials. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Login Form */}
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Login to your Account</h1>
            <p>Welcome back! Select the below login methods.</p>
          </div>

          {/* Alert */}
          {alert && (
            <div className={`alert alert-${alert.type}`}>
              <span className="icon">
                {alert.type === "success" && "✅"}
                {alert.type === "error" && "❌"}
              </span>
              <span>{alert.message}</span>
              <button className="close-btn" onClick={() => setAlert(null)}>
                ×
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label>Email ID / Username</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email id / username"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>or login with</span>
          </div>

          {/* Social Login */}
          <div className="social-login">
            <button className="social-btn google">
              <span className="social-icon">G</span>
              Google
            </button>
            <button className="social-btn facebook">
              <span className="social-icon">f</span>
              Facebook
            </button>
            <button className="social-btn linkedin">
              <span className="social-icon">in</span>
              LinkedIn
            </button>
          </div>

          {/* Register Link */}
          <div className="register-link">
            Don't have an account? <a href="/register">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
