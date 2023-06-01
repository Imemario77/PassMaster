import express from "express";
import { createNewPasswordData } from "../controllers/passwordManger.js";
const router = express.Router();

router.post("/save", createNewPasswordData);

export default router;
