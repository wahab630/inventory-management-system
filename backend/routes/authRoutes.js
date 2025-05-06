import express from "express";
const router = express.Router();
import { AuthController, loginUser, logoutUser, registerNewUser } from "../controllers/authController.js";
import { AuthValidation } from "../validation/auth.validation.js";
import { Validation } from "../middleware/validation.js";
import { Authentication } from "../middleware/authentication.js";

// router.route("/auth/register").post(registerNewUser);
router.route("/auth/register").post(AuthValidation.RegisterUser, Validation, AuthController.RegisterUser);
router.route("/auth/login").post(AuthValidation.LoginUser, Validation, AuthController.LoginUser);
router.route("/profile").post(Authentication, AuthController.LoginUser);
// router.route("/auth/login").post(loginUser);
router.route("/auth/logout").post(logoutUser);//req post b ho sakti get b kyunka koi data ni bhej re frontend se

export default router;
