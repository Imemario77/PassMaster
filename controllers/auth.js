import { User, Otp } from "../Helpers/database.js";
import { transporter } from "../Helpers/mailTransporter.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
	
   try {
      const { username_email, password } = req.body;
      const found = await User.find({ email: username_email });
      const found_user =
         found.length === 0 && (await User.find({ username: username_email }));
      if (found.length > 0) {
         if (password) {
            bcrypt.compare(password, found[0].password, async (err, result) => {
               if (result === true) {
                  await Otp.deleteMany({ id: found[0]._id });
                  // generating and sending otp code
                  const otpCode =
                     Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                  try {
                     const currentTime = new Date().getTime();
                     const minutes = 10;
                     const otpExpirationTime = minutes * 60000;
                     const saveOtp = new Otp({
                        otp: otpCode,
                        id: found[0]._id,
                        created: currentTime,
                        expries: currentTime + otpExpirationTime,
                     });
                     await saveOtp.save();
                     const sentMail = await transporter(
                        found[0].email,
                        found[0].username,
                        otpCode
                     );
                     console.log(sentMail);
                     if (sentMail === true) {
                        res.render("otp", {
                           status: "STARTING_VERIFICATION",
                           message: "Waiting to verify",
                           User: found[0]._id.toString(),
                        });
                     } else {
                        res.render("login", {
                           status: "FAILED",
                           message: "error processing otp try again",
                           User: "",
                        });
                     }
                  } catch (e) {
                     res.render("login", {
                        status: "FAILED",
                        message: "error processing otp try again",
                        User: "",
                     });
                     console.log(e);
                  }
               } else {
                  res.render("login", {
                     status: "FAILED",
                     message: "password is incorrect try again",
                     User: "",
                  });
               }
            });
         } else {
            res.render("login", {
               status: "FAILED",
               message: "password or username field  is empty",
               User: "",
            });
         }
      } else if (found_user.length > 0) {
         if (password) {
            bcrypt.compare(
               password,
               found_user[0].password,
               async (err, result) => {
                  if (result === true) {
                     // generating, sending and saving otp code to database
                     await Otp.deleteMany({ id: found_user[0]._id });
                     const otpCode =
                        Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                     try {
                        const currentTime = new Date().getTime();
                        const minutes = 10;
                        const otpExpirationTime = minutes * 60000;
                        const saveOtp = new Otp({
                           otp: otpCode,
                           id: found_user[0]._id,
                           created: currentTime,
                           expries: currentTime + otpExpirationTime,
                        });
                        await saveOtp.save();
                        const sentMail = transporter(
                           found_user[0].email,
                           found_user[0].username,
                           otpCode
                        );
                        console.log(sentMail);
                        if (sentMail) {
                           res.render("otp", {
                              status: "STARTING_VERIFICATION",
                              message: "Waiting to verify",
                              User: found_user[0]._id.toString(),
                           });
                        } else {
                           res.render("login", {
                              status: "FAILED",
                              message: "error processing otp try again",
                              User: "",
                           });
                        }
                     } catch (e) {
                        res.render("login", {
                           status: "FAILED",
                           message: "error processing otp try again",
                           User: "",
                        });
                        console.log(e);
                     }
                  } else {
                     res.render("login", {
                        status: "FAILED",
                        message: "password is incorrect try again",
                        User: "",
                     });
                  }
               }
            );
         } else {
            res.render("login", {
               status: "FAILED",
               message: "password or username field  is empty",
               User: "",
            });
         }
      } else {
         res.render("login", {
            status: "FAILED",
            message: "Account doesn't exits ",
            User: "",
         });
      }
   } catch (e) {
      console.log("FAILED to login	");
      res.render("login", {
         status: "FAILED",
         message: "Unknown error occured try again later",
         User: "",
      });
   }
};

export const register = async (req, res) => {
   try {
      const { username, password, confirmPassword, email } = req.body;
      const found = await User.find({ email: email });

      if (found.length > 0) {
         res.render("register", {
            status: "FAILED",
            message: "email already in use",
            User: "",
         });
      } else {
         if (!username || !email) {
            res.render("register", {
               status: "FAILED",
               message: "Must provide username and email",
               User: "",
            });
         } else {
            if (!password) {
               res.render("register", {
                  status: "FAILED",
                  message: "Must provide a password",
                  User: "",
               });
            } else {
               if (password.length < 6) {
                  res.render("register", {
                     status: "FAILED",
                     message: "Must provide password greater than six digit",
                     User: "",
                  });
               } else {
                  if (password !== confirmPassword) {
                     res.render("register", {
                        status: "FAILED",
                        message: "Passwords don't match try again",
                        User: "",
                     });
                  } else {
                     bcrypt.hash(password, 10, async (err, hash) => {
                        if (err) {
                           console.log(err);
                        } else {
                           const user = new User({
                              username: username,
                              email: email,
                              password: hash,
                           });
                           try {
                              const result = await user.save();
                              // generating, sending and saving otp code to database
                              const otpCode =
                                 Math.floor(Math.random() * (9999 - 1000 + 1)) +
                                 1000;
                              try {
                                 const currentTime = new Date().getTime();
                                 const minutes = 10;
                                 const otpExpirationTime = minutes * 60000;
                                 const saveOtp = new Otp({
                                    otp: otpCode,
                                    id: result._id,
                                    created: currentTime,
                                    expries: currentTime + otpExpirationTime,
                                 });
                                 await saveOtp.save();
                                 const sentMail = transporter(
                                    result.email,
                                    result.username,
                                    otpCode
                                 );
                                 console.log(sentMail);
                                 if (sentMail) {
                                    res.render("otp", {
                                       status: "STARTING_VERIFICATION",
                                       message: "Waiting to verify",
                                       User: result._id.toString(),
                                    });
                                 } else {
                                    res.render("login", {
                                       status: "FAILED",
                                       message:
                                          "error processing otp try again",
                                       User: "",
                                    });
                                 }
                              } catch (e) {
                                 res.render("login", {
                                    status: "FAILED",
                                    message: "error processing otp try again",
                                    User: "",
                                 });
                                 console.log(e);
                              }

                              // res.render("otp", {
                              //    status: "STARTING_VERIFICATION",
                              //    message: "Waiting to verify",
                              //    User: result._id,
                              // });
                           } catch (e) {
                              res.render("register", {
                                 status: "FAILED",
                                 message: "an error ocured",
                                 User: "",
                              });
                           }
                        }
                     });
                  }
               }
            }
         }
      }
   } catch (e) {
      console.log("FAILED to signup");
      res.render("register", {
         status: "FAILED",
         message: "Unknown error occured try again later",
         User: "",
      });
   }
};

export const logout = (req, res) => {
   res.clearCookie("token");
   res.redirect("/auth/login");
};
