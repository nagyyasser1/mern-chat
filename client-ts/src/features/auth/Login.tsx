import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/auth.service";
import { useAppDispatch } from "../../app/hooks";
import { login as loginAction } from "./authSlice";

import styles from "./styles/Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: any = await login(formData);

      const { token, fullName, username, email, gender, profilePic } =
        response?.data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          fullName,
          username,
          email,
          gender,
          profilePic,
        })
      );

      dispatch(
        loginAction({
          token,
          userInfo: { fullName, email, username, gender, profilePic },
        })
      );

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
        <h5 className="mt-2">
          Don't have an account? <Link to="/auth/signup">Sign Up </Link>
        </h5>
        {error && <p className="error-message">Login failed</p>}
      </form>
    </div>
  );
};

export default Login;
