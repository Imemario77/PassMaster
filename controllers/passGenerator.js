import {
   uppercaseChars,
   lowercaseChars,
   numberChars,
   symbolChars,
} from "../Helpers/varables.js";

export const passwordGenerator = (req, res) => {
   const {
      passLength,
      hasSpecialChars,
      hasUppercaseChars,
      hasLowercaseChars,
      hasNumberChars,
   } = req.body;
   function generatePassword(
      length,
      includeUppercase,
      includeLowerCase,
      includeNumbers,
      includeSymbols
   ) {
      let charset = "";
      let password = "";

      if (includeUppercase) {
         charset += uppercaseChars;
      }

      if (includeNumbers) {
         charset += numberChars;
      }

      if (includeSymbols) {
         charset += symbolChars;
      }

      if (includeLowerCase) {
         charset += lowercaseChars;
      }

      for (let i = 0; i < length; i++) {
         const randomIndex = Math.floor(Math.random() * charset.length);
         password += charset.charAt(randomIndex);
      }

      return password;
   }

   const generatedPassword = generatePassword(
      passLength,
      hasUppercaseChars,
      hasLowercaseChars,
      hasNumberChars,
      hasSpecialChars
   );
   console.log(generatedPassword);
   res.json({password: generatedPassword})
};
