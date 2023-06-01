import express from "express";
import { home } from "../controllers/home.js";
import { passwordData } from "../controllers/passwordManger.js";
import { authenticateToken } from "../Helpers/authToken.js";
const router = express.Router();

router.get("/home", authenticateToken, passwordData, home);

export default router;
