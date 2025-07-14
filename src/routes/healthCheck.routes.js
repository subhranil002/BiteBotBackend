import { Router } from "express";
import { handleHealthCheck } from "../controllers/healthCheck.controller.js";

const healthCheckRoutes = Router();

// Health check route
healthCheckRoutes.route("/").get(handleHealthCheck);

export default healthCheckRoutes;
