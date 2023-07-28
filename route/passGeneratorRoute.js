import express from "express";
import { passwordGenerator } from "../controllers/passGenerator.js";
const router = express.Router();


router.post('/password', passwordGenerator)

export default router;
