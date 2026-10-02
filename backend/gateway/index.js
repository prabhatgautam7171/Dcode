import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { protect } from "./middleware/protect.js";
import { getCurrentUser } from "./controllers/user.controller.js";
import axios from "axios";
import { createProxyMiddleware } from "http-proxy-middleware";

configDotenv();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

app.use(
  cors({
    origin:
      process.env.FrontedUrl || "http://localhost:5173",

    methods: ["GET", "POST", "PUT", "DELETE"],

    allowedHeaders: ["Content-Type", "Authorization"],

    credentials: true,
  })
);

app.use(cookieParser()); // Middleware to parse cookies
app.use(morgan("dev")); // Middleware for logging HTTP requests

app.get("/",(req, res) => {
  res.send("Gateway server is running ❤️");
});

//?? Redirect routes to microservices
app.get("/api/auth", (req, res) => {   // Redirect to the auth service
  res.redirect(process.env.AuthServiceUrl || "http://localhost:5001");
});

app.use(
  "/api/project",
  protect,

  (req, res, next) => {
    req.projectUserId = req.user?._id?.toString();

    console.log("Gateway user ID:", req.projectUserId);

    next();
  },

  createProxyMiddleware({
    target: `${process.env.ProjectServiceUrl || "http://localhost:8002"}/api/project`,
    changeOrigin: true,

    on: {
      proxyReq: (proxyReq, req) => {
        console.log("Proxy user ID:", req.projectUserId);

        if (req.projectUserId) {
          proxyReq.setHeader("X-User-Id", req.projectUserId);
        }
      },
    },
  })
);

app.get("/api/file", protect, (req, res) => {   // Redirect to the file service
  res.redirect(process.env.FileServiceUrl || "http://localhost:5003" , {
    headers: {
      "X-User-Id": req.user?._id.toString(),
    },
  });
});



// Route to get the current user
app.get("/api/getMe", protect , getCurrentUser);

app.listen(PORT, () => {
  console.log(`🚪 Gateway server is running on port ${PORT}`);
});
