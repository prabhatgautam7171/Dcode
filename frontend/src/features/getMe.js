import axios from "axios";


export const getMe = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/getMe",
    );

    console.log("Get me : ", response.user);

    return response.user;
  } catch (error) {
    console.error(
      "get me error:",
      error.response?.data || error.message
    );

    throw error;
  }
};
