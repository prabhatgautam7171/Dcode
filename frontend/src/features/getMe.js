import axios from "axios";

export const getMe = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/getMe",
      {
        withCredentials: true,
      }
    );

    console.log("Get me:", response.data.user);

    return response.data.user;
  } catch (error) {
    console.error(
      "get me error:",
      error.response?.data || error.message
    );

    throw error;
  }
};
