import React, { useState } from "react";
import { loginFun } from "../../api/auth.api";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState(null);

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
      await loginFun(formData);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
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
        <button type="submit">Login</button>
        <h5 className="mt-2">
          Don't have an account? <Link to="/auth/signup">Sign Up </Link>
        </h5>
      </form>
    </div>
  );
};

export default Login;
