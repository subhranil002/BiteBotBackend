import express from "express";
import env from "dotenv";

import {
    userRoutes, healthCheckRoutes
} from './routes/index.js'

const app = express();
env.config();

// middlewares
app.use(express.json());

// routes
app.use('/api/test', healthCheckRoutes)
app.use("/api/user", userRoutes);

export default app;
