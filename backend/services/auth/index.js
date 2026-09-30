import { configDotenv } from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import { connectDB } from "./config/db.js";

configDotenv();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*", // Allow requests from any origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}))

app.get("/",(req, res) => {
  res.send("🔐 Auth service is running ❤️");
});

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  connectDB();
  console.log(`🔐 Auth service is running on port ${PORT}`);
});
