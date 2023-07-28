import CryptoJS from "crypto-js";

export function hasSimilarCharacter(str1, str2) {
   for (let char of str2) {
      if (str1.includes(char)) {
         return true;
      }
   }
   return false;
}

export function encryptionProcess(password) {
   const encrypted = CryptoJS.AES.encrypt(password, "secret key");
   return encrypted.toString();
}

export function decryptionProcess(passwordhash) {
   const decrypted = CryptoJS.AES.decrypt(passwordhash, "secret key");
   return decrypted.toString(CryptoJS.enc.Utf8);
}
