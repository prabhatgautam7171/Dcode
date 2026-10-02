import express from "express";
import { configDotenv } from "dotenv";
import { connectDB } from "./config/db.js";

configDotenv();

const PORT = process.env.PORT || 5003;

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

app.get("/", (req, res) => {
  res.send("File service is running ❤️");
});


app.listen(PORT, () => {
  connectDB();
  console.log(`File service is running on port ${PORT}`);
});
