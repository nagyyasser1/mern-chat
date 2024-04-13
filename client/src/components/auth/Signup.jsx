import React, { useState } from "react";
import { registerFun } from "../../api/auth.api"; // Import the register function
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    username: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerFun(formData);
      setSuccessMessage("Registration successful!");
      setError(null);
      navigate("/auth/login");
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Sign-Up</h2>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
        <h5 className="mt-2">
          Aready have an account? <Link to="/auth/login">Login </Link>
        </h5>
      </form>
    </div>
  );
};

export default Signup;
