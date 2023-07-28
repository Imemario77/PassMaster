import express from "express";
import {
   createNewPasswordData,
   fetchUserPasswordData,
   updateUserPassword,
   deleteUserPassword
} from "../controllers/passwordManger.js";
const router = express.Router();

router.post("/save", createNewPasswordData);
router.post("/get", fetchUserPasswordData);
router.post("/update", updateUserPassword);
router.post("/delete", deleteUserPassword);

export default router;
