import { configDotenv } from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.route.js";

configDotenv();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.get("/",(req, res) => {
  res.send("🔐 Auth service is running ❤️");
});

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`🔐 Auth service is running on port ${PORT}`);
});
