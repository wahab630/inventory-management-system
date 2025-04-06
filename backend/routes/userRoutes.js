import express from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// Routes for user management
router.route("/users").get(getAllUsers); 
router.route("/users/:id").get(getUserById); 
router.route("/users/:id").put(updateUser); 
router.route("/users/:id").delete(deleteUser); 

export default router;