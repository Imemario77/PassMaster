import { Otp, User } from "../Helpers/database.js";
import { transporter } from "../Helpers/mailTransporter.js";
import jwt from "jsonwebtoken";

export const VerifyOTP = async (req, res) => {
   const { first, second, third, fourth, id } = req.body;
   if ((!first || !second || !third || !fourth, !id)) {
      console.log("failed");
      res.render("otp", {
         status: "PENDING",
         message: "Verification Failed User not identified",
         User: "",
      });
   } else {
      try {
         const otpSearchResult = await Otp.find({ id: id });
         if (otpSearchResult.length < 1) {
            console.log("otp not found");
            res.render("login", {
               status: "PENDING",
               message: "OTP not found",
               User: "",
            });
         } else {
            if (
               otpSearchResult[0].otp !== `${first}${second}${third}${fourth}`
            ) {
               console.log("incorrect otp");
               res.render("otp", {
                  status: "PENDING",
                  message: "Verification Failed OTP is incorrect",
                  User: id,
               });
            } else {
               if (otpSearchResult[0].expries - new Date().getTime() < 0) {
                  console.log("expired otp");
                  Otp.deleteMany({ id: id }).then(
                     res.render("login", {
                        status: "PENDING",
                        message: "OTP has expired login",
                        User: "",
                     })
                  );
               } else {
                  const otpDeleted = Otp.deleteMany({ id: id });
                  console.log("otp Verification succesfull");
                  if (otpDeleted) {
                     const verifiedUser = await User.findById(id);
                     console.log(verifiedUser);
                     if (verifiedUser) {
                        const secretKey =
                           "772e2a2144401ecff752d3218313fe076cc2d1211334f0e6526f3d24c04fd74d82f679ed9e6ae30f8303d3ef8d0f0eb1f23c175092158403f4eb5ab254c130eb";
                        const token = jwt.sign(
                           verifiedUser.toObject(),
                           secretKey , { expiresIn: '1h' }
                        );
                        console.log("token: " + token);
                        // Set the token as a cookie
                        res.cookie("token", token, { httpOnly: true });
                        res.redirect(
                           `/manager/home/`
                        );
                     }
                  }
               }
            }
         }
      } catch (e) {
         console.log(e);
      }
   }
};
// resend otp to user email
export const resendOtp = async (req, res) => {
   const otpDeleted = await Otp.deleteMany({ id: req.body.id });
   console.log(otpDeleted);
   const verifiedUser = await User.findById(req.body.id);
   console.log(verifiedUser);
   if (otpDeleted.acknowledged === true) {
      // generating, sending and saving otp code to database
      const otpCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      try {
         const currentTime = new Date().getTime();
         const minutes = 10;
         const otpExpirationTime = minutes * 60000;
         const saveOtp = new Otp({
            otp: otpCode,
            id: verifiedUser._id.toString(),
            created: currentTime,
            expries: currentTime + otpExpirationTime,
         });
         await saveOtp.save();
         const sentMail = transporter(
            verifiedUser.email,
            verifiedUser.username,
            otpCode
         );
         console.log(sentMail);
         if (sentMail) {
            res.render("otp", {
               status: "PENDING",
               message: "Waiting to verify",
               User: verifiedUser._id.toString(),
            });
         }
      } catch (e) {
         console.log("cant generate pin: ");
         console.log(e);
         res.render("otp", {
            status: "PENDING",
            message: "error generating otp pin try again",
            User: verifiedUser._id.toString(),
         });
      }
   }
};
