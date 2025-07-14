import express from "express";

import { userRoutes, healthCheckRoutes } from "./routes/index.js";

const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/api/test", healthCheckRoutes);
app.use("/api/user", userRoutes);

export default app;
