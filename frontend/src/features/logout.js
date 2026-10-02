import axios from "axios";

export const logout = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:8001/api/auth/logout",
    );

    console.log("Logout successful:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Logout error:",
      error.response?.data || error.message
    );

    throw error;
  }
};
