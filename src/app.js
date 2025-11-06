import express from "express";
import errorMiddleware from "./middlewares/error.middlewares.js";
import {
    userRoutes,
    healthCheckRoutes,
    chatbotRoutes,
    recipeRoutes,
} from "./routes/index.js";
import cookieParser from "cookie-parser";
import constants from "./constants.js";
import cors from "cors";

const app = express();

// cors setup
const corsOptions = {
    origin: constants.ALLOWED_ORIGINS,
    credentials: true,
};

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// routes
app.use("/api/test", healthCheckRoutes);
app.use("/api/user", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/chatbot", chatbotRoutes);

// handling all other incorrect routes
app.all(/./, (req, res) => {
    res.status(404).json({ message: "Page does not exist" });
});

// error middleware
app.use(errorMiddleware);
export default app;
