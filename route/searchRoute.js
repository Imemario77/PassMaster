import express from "express";
import { search } from "../controllers/search.js";
const router = express.Router();

router.post("/:search/:userId", search);

export default router;
