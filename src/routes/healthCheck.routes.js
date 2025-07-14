import { Router } from "express";
const healthCheckRoutes = Router();

// Health check route
healthCheckRoutes.route("/").get();

export default healthCheckRoutes;
