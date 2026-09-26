import firebaseAdmin from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";



export const login = async (req, res) => {
  try {
     const {token} = req.body;
     const decodedToken = await getAuth(firebaseAdmin).verifyIdToken(token);
     console.log("Decoded Token:", decodedToken);
     const uid = decodedToken.uid;
     const email = decodedToken.email;
     const name = decodedToken.name;

     // Here you can create a session or JWT for your application
     // For example, you can create a JWT and send it back to the client
     // const jwtToken = createJWT(uid, email, name); // Implement this function as needed

     res.status(200).json({ message: "Login successful", uid, email, name });
  } catch (error) {
     return res.status(401).json({ message: "Invalid token", error: error.message });
  }
}
