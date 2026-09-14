import { useState } from "react";
import api from "../services/api";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.post("/register", formData);
      
      // Success
      setAlert({
        type: 'success',
        message: 'Registration successful! Welcome aboard! 🎉'
      });
      
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
      });
      
      console.log(response.data);
      
    } catch (error) {
      // Error handling
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Registration failed. Please try again.';
      
      setAlert({
        type: 'error',
        message: errorMessage
      });
      
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
    
    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <div className="register-page">

        <div>
            <img src="src/image/logo2.png" alt="Job Portal Logo" className="image-container"/>
        </div>
      <div className="top-bar">
        <div className="navbar">
          <h6>Home</h6>
          <h6>Find Jobs</h6>
          <h6>About Us</h6>
        </div>


        <div className="top-buttons">
          <button type="button" className="contact-btn">
            Contact us
          </button>

        <a href="/login" className="buttons">
    Login
</a>
        </div>
      </div>

      <div className="register-header">
        <h1>Registration form</h1>
        <p>Register to apply for jobs of your choice all over the world</p>
      </div>

      <div className="register-card">
        {/* Alert message */}
        {alert && (
          <div className={`alert alert-${alert.type}`}>
            <span className="icon">
              {alert.type === 'success' && '✅'}
              {alert.type === 'error' && '❌'}
              {alert.type === 'info' && 'ℹ️'}
            </span>
            <span>{alert.message}</span>
            <button className="close-btn" onClick={() => setAlert(null)}>
              ×
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Full name<span>*</span>
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              Email ID<span>*</span>
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email id"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <p className="hint">
              Job notifications will be sent to this email id
            </p>
          </div>

          <div className="form-group">
            <label>
              Password<span>*</span>
            </label>

            <input
              type="password"
              name="password"
              placeholder="(Minimum 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />

            <p className="hint">Remember your password</p>
          </div>

          <div className="form-group">
            <label>
              Mobile number<span>*</span>
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your mobile number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <p className="hint">Recruiters will contact you on this number</p>
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register now'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;