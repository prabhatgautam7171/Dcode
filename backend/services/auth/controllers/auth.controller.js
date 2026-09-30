import firebaseAdmin from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";
import { User } from "../models/user.model.js";
import redis from "../../../shared/redis/redis.js";




export const login = async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = await getAuth(firebaseAdmin).verifyIdToken(token);

    const user = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!user) {
      const newUser = new User({
        firebaseUid: decodedToken.uid,
        name: decodedToken.name || "Anonymous",
        email: decodedToken.email,
        avatar: decodedToken.picture || "",
      });

      await newUser.save();
      return res.status(201).json({ message: "User created", user: newUser });
    }

    const sessionId = crypto.randomUUID();

    await redis.set(`session:${sessionId}`, JSON.stringify({
      name : user.name,
      _id : user._id.toString(),
      email: user.email,
      avatar: user.avatar,
    }, 'EX', 7*24*60*60)); // Session expires in 1 hour

    res.cookie("session", sessionId, {
      httpOnly : true,
      secure : false,
      sameSite : "strict",
      maxAge : 7*24*60*60*1000
    });

    return res.status(200).json({
      message : `Welcome back, ${user.name}`,
      data : user
    })


  } catch (error) {
    return res.status(401).json({ message: "Login error", error: error.message });
  }
}

export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;

    await redis.del(`session:${sessionId}`)

    res.clearCookie("session", sessionId)

    return res.status(200).json({
      message : `User Logged Out.`
    })


  } catch (error) {
    return res.status(401).json({ message: "Logout error", error: error.message });
  }
}
