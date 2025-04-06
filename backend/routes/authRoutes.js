import express from "express";
const router = express.Router();
import { loginUser, logoutUser, registerNewUser } from "../controllers/authController.js";

router.route("/auth/register").post(registerNewUser);
router.route("/auth/login").post(loginUser);
router.route("/auth/logout").post(logoutUser);//req post b ho sakti get b kyunka koi data ni bhej re frontend se

export default router;
