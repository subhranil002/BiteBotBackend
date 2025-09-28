import { Router } from "express";
import {
    handleRegister,
    handleLogin,
    handleLogout,
    handleChangeAvatar,
    handleChangePassword,
    handleResetPassword,
    handleForgetPassword,
    handleGetProfile,
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
userRoutes.route("/change-password").get(isLoggedIn, handleChangePassword);
userRoutes.route("/reset-password").get(handleResetPassword); //Not implemented
userRoutes.route("/forget-password").get(handleForgetPassword);//Not implemented
userRoutes.route("/me").get(isLoggedIn,handleGetProfile);

export default userRoutes;
