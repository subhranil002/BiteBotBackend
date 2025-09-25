import { Router } from "express";
import {
    handleRegister,
    handleLogin,
    handleLogout,
    handleChangeAvatar,
} from "../controllers/user.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
import upload from "../middlewares/multer.middlewares.js";

const userRoutes = Router();

userRoutes.route("/register").post(handleRegister);
userRoutes.route("/login").post(handleLogin);
userRoutes.route("/logout").post(isLoggedIn, handleLogout);
userRoutes
    .route("/change-avatar")
    .post(isLoggedIn, upload.single("avatar"), handleChangeAvatar);

export default userRoutes;
