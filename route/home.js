import express from "express";
import { home } from "../controllers/home.js";
import { authenticateToken } from "../Helpers/authToken.js";
const router = express.Router();

router.get("/home",authenticateToken, home);

export default router;
