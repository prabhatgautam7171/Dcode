import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";

export const login = async (token) => {
  try {
    const response = await axios.post(
      "http://localhost:8001/api/auth/login",
      { token },
      {
        withCredentials: true,
      }
    );

    console.log("Login successful:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

export const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const user = result.user;
    const token = await user.getIdToken();

    const data = await login(token);

    return {
      data,
      user,
    };
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};
