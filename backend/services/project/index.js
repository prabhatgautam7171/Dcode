import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import projectRoutes from "./routes/project.route.js";

configDotenv();

const PORT = process.env.PORT || 5002;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin:
      process.env.FrontedUrl || "http://localhost:5173",

    methods: ["GET", "POST", "PUT", "DELETE"],

    allowedHeaders: ["Content-Type", "Authorization"],

    credentials: true,
  })
);

app.get("/",(req, res) => {
  res.send("📌 Project service is running ❤️");
});

app.use((req, res, next) => {
  console.log(
    "PROJECT SERVICE:",
    req.method,
    req.originalUrl,
    req.headers["x-user-id"]
  );
  next();
});

app.use("/api/project", projectRoutes);


app.listen(PORT, () => {
  connectDB();
  console.log(`📌 Project service is running on port ${PORT}`);
});
