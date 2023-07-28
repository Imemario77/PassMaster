import { PasswordManger } from "../Helpers/database.js";
import {
   hasSimilarCharacter,
   decryptionProcess,
   encryptionProcess,
} from "../Helpers/appFunctions.js";
import {
   uppercaseChars,
   lowercaseChars,
   numberChars,
   symbolChars,
} from "../Helpers/varables.js";

export const passwordData = async (req, res, next) => {
   try {
      const data = await PasswordManger.find({ id: req.user._id });
      req.data = data;
   } catch (e) {
      req.data = [];
      console.log(e);
   }
   next();
};

export const createNewPasswordData = async (req, res) => {
   let strength = 0;
   let strengthStatus = "";
   const password = req.body.password;
   if (password.length <= 6) {
      strength = 1;
      strengthStatus = "Very Poor";
   } else if (
      password.length >= 16 &&
      hasSimilarCharacter(password, uppercaseChars) &&
      hasSimilarCharacter(password, lowercaseChars) &&
      hasSimilarCharacter(password, numberChars) &&
      hasSimilarCharacter(password, symbolChars)
   ) {
      strength = 10;
      strengthStatus = "Excellent";
   } else if (
      password.length >= 13 &&
      hasSimilarCharacter(password, uppercaseChars) &&
      hasSimilarCharacter(password, lowercaseChars) &&
      hasSimilarCharacter(password, numberChars) &&
      hasSimilarCharacter(password, symbolChars)
   ) {
      strength = 9;
      strengthStatus = "Strong";
   } else if (
      password.length >= 11 &&
      hasSimilarCharacter(password, uppercaseChars) &&
      hasSimilarCharacter(password, lowercaseChars) &&
      hasSimilarCharacter(password, numberChars) &&
      hasSimilarCharacter(password, symbolChars)
   ) {
      strength = 8;
      strengthStatus = "Very Good";
   } else if (
      password.length >= 9 &&
      hasSimilarCharacter(password, uppercaseChars) &&
      hasSimilarCharacter(password, lowercaseChars) &&
      hasSimilarCharacter(password, numberChars) &&
      hasSimilarCharacter(password, symbolChars)
   ) {
      strength = 7;
      strengthStatus = "Average";
   } else if (
      password.length >= 9 &&
      hasSimilarCharacter(password, uppercaseChars) &&
      hasSimilarCharacter(password, lowercaseChars) &&
      hasSimilarCharacter(password, numberChars)
   ) {
      strength = 6;
      strengthStatus = "Medium";
   } else if (
      password.length >= 7 &&
      hasSimilarCharacter(password, uppercaseChars) &&
      hasSimilarCharacter(password, lowercaseChars) &&
      hasSimilarCharacter(password, numberChars) &&
      hasSimilarCharacter(password, symbolChars)
   ) {
      strength = 5;
      strengthStatus = "Good";
   } else if (
      password.length >= 7 &&
      hasSimilarCharacter(password, uppercaseChars) &&
      hasSimilarCharacter(password, lowercaseChars)
   ) {
      strength = 4;
      strengthStatus = "Okay";
   } else if (
      password.length >= 6 &&
      hasSimilarCharacter(password, uppercaseChars) &&
      hasSimilarCharacter(password, lowercaseChars)
   ) {
      strength = 3;
      strengthStatus = "Poor";
   } else if (password.length >= 6) {
      strength = 2;
      strengthStatus = "Very Poor";
   } else if (password.length >= 5) {
      strength = 3;
      strengthStatus = "Bad";
   }
   const encryptedPassword = encryptionProcess(password);
   try {
      const passwordDataSchema = new PasswordManger({
         title: req.body.title,
         id: req.body.id,
         email: req.body.username_email,
         password: encryptedPassword,
         strength: strength,
         strengthStatus: strengthStatus,
         created: new Date(),
      });
      const result = await passwordDataSchema.save();
      res.redirect("/manager/home");
   } catch (e) {
      console.log(e);
   }
};

export const fetchUserPasswordData = async (req, res) => {
   let data = await PasswordManger.find({ _id: req.body.id });
   const decryptedPassword = decryptionProcess(data[0].password);
   data = data[0].toObject();
   data.password = decryptedPassword;
   res.render("viewPassword", { data: data });
};

export const updateUserPassword = async (req, res) => {
   try {
      let update;
      if (req.body.email && req.body.password) {
         const encryptPassword = encryptionProcess(req.body.password);
         update = {
            $set: { email: req.body.email, password: encryptPassword },
         };
      } else if (req.body.password) {
         update = { $set: { password: encryptPassword } };
      } else if (req.body.email) {
         update = { $set: { email: req.body.email } };
      }
      await PasswordManger.updateOne({ _id: req.body.id }, update);
      let data = await PasswordManger.find({ _id: req.body.id });
      const decryptedPassword = decryptionProcess(data[0].password);
      data = data[0].toObject();
      data.password = decryptedPassword;
      res.render("viewPassword", { data: data });
   } catch (e) {
      console.log(e);
   }
};

export const deleteUserPassword = async (req, res) => {
   console.log(req.body);
   try {
      const deleted = await PasswordManger.deleteOne({ _id: req.body.id });
      res.redirect("/manager/home");
   } catch (e) {
      console.log(e);
   }
};
