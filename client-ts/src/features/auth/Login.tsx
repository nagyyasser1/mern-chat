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

      const { token, fullName, username, email, gender, profilePic, _id } =
        response?.data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          _id,
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
          userInfo: { _id, fullName, email, username, gender, profilePic },
        })
      );

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit} className={styles.login_form}>
        <h2>Login</h2>

        <div className={styles.login_form_group}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.login_form_group}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.login_btn_container}>
          <button
            type="submit"
            disabled={isLoading}
            className={styles.login_btn}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
        <h5>
          Don't have an account?{" "}
          <Link to="/auth/signup" className={styles.signup_link}>
            Sign Up{" "}
          </Link>
        </h5>
        {error && <p className="error-message">Login failed</p>}
      </form>
    </div>
  );
};

export default Login;
