import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { protect } from "./middleware/protect.js";
import { getCurrentUser } from "./controllers/user.controller.js";

configDotenv();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

app.use(cors({
  origin: "*", // Allow requests from any origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}))

app.use(cookieParser()); // Middleware to parse cookies
app.use(morgan("dev")); // Middleware for logging HTTP requests

app.get("/",(req, res) => {
  res.send("Gateway server is running ❤️");
});

app.get("/api/auth", (req, res) => {   // Redirect to the auth service
  res.redirect(process.env.AuthServiceUrl || "http://localhost:5001");
});

app.get("/api/getMe", protect , getCurrentUser);

app.listen(PORT, () => {
  console.log(`🚪 Gateway server is running on port ${PORT}`);
});
