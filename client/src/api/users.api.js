import { API_URL, accessToken } from ".";
import axios from "axios";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};
