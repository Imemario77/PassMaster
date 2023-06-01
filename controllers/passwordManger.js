import CryptoJS from "crypto-js";
import { PasswordManger } from "../Helpers/database.js";

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

function hasSimilarCharacter(str1, str2) {
   for (let char of str2) {
      if (str1.includes(char)) {
         return true;
      }
   }
   return false;
}

function encryptionProcess(password) {
   // Example usage
   const encrypted = CryptoJS.AES.encrypt(password, "secret key");
   console.log("password: " + encrypted.toString());
   return encrypted.toString();
}
function decryptionProcess(password) {
   // Example usage
   const encrypted = CryptoJS.AES.decrypt(password, "secret key");
   console.log("decrypt password: " + encrypted.toString(CryptoJS.enc.Utf8));
}

export const createNewPasswordData = async (req, res) => {
   var uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   var lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
   var numberChars = "0123456789";
   var symbolChars = "!@#$%^&*()-_=+";

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
         email: req.body.email,
         password: encryptedPassword,
         strength: strength,
         strengthStatus: strengthStatus,
         created: new Date(),
      });
      const result = await passwordDataSchema.save();
      console.log(result);
   } catch (e) {
      console.log(e);
   }
};
