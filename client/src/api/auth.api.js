import axios from "axios";
import { API_URL } from ".";

// Regular expression for a strong password (at least 8 characters with at least one uppercase, one lowercase, one number, and one special character)
// const strongPasswordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerFun = async ({
  fullName,
  email,
  password,
  confirmPassword,
  gender,
  username,
}) => {
  // Input validation
  if (
    !fullName ||
    !email ||
    !password ||
    !confirmPassword ||
    !gender ||
    !username
  ) {
    throw new Error("All registration fields are required!");
  }

  // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  //   throw new Error("Invalid email format!");
  // }

  // if (!strongPasswordRegex.test(password)) {
  //   throw new Error(
  //     "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
  //   );
  // }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match!");
  }

  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, {
      fullName,
      email,
      password,
      confirmPassword,
      gender,
      username,
    });

    console.log("Registration successful!");
    return response.data; // Return any data from the registration endpoint if needed
  } catch (error) {
    console.error("Registration error:", error.message);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

export const loginFun = async ({ username, password }) => {
  // Input validation
  if (!username || !password) {
    throw new Error("Username and password are required for login!");
  }

  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      username,
      password,
    });

    if (response.data && response.data.token) {
      localStorage.setItem("accessToken", response.data.token);
      delete response.data.token;
      localStorage.setItem("userInfo", JSON.stringify({ ...response.data }));
      console.log("Login successful!");
    } else {
      throw new Error("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Login error:", error.message);
    throw error; // Re-throw the error to propagate it to the caller
  }
};
