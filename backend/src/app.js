import express from "express";
import dns from "dns";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

// Custom DNS server configuration: preserve Docker DNS resolution unless connecting to Atlas SRV or explicitly requested
if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(","));
} else if (process.env.MONGO_URI?.startsWith("mongodb+srv://")) {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

import client from "prom-client";

// Prometheus default metrics collection
client.collectDefaultMetrics({ register: client.register });

// Health check endpoint required by project specification
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    commitSha: process.env.COMMIT_SHA || "local",
  });
});

// Prometheus metrics endpoint for monitoring
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

export default app;
