import express from "express";
import { login, register, logout } from "../controllers/auth.js";
import { VerifyOTP, resendOtp } from "../controllers/Otp.js";
import { authenticateLogin_SignUp_Token } from "../Helpers/authToken.js";
const router = express.Router();

router.get("/login", authenticateLogin_SignUp_Token, (req, res) => {
   res.render("login", {
      status: "",
      message: "",
      User: "",
   });
});
router.get("/register", authenticateLogin_SignUp_Token, (req, res) => {
   res.render("register", {
      status: "",
      message: "",
      User: "",
   });
});
router.get("/logout", logout);

router.post("/login", login);
router.post("/register", register);
router.post("/otp", VerifyOTP);
router.post("/resendOtp", resendOtp);

export default router;
