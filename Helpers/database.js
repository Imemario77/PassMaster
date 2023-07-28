import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
   username: { type: String, reqiured: true },
   password: String,
   email: {
      type: String,
      reqiured: true,
      unique: true,
   },
});

export const User = new mongoose.model("user", userSchema);

const otpSchema = new Schema({
   otp: String,
   id: String,
   created: String,
   expries: String,
});

export const Otp = new mongoose.model("otp", otpSchema);

const passwordMangerSchema = new Schema({
   title: String,
   id: String,
   email: String,
   password: String,
   strength: String,
   strengthStatus: String,
   created: String,
   updated: Array,
});

export const PasswordManger = new mongoose.model(
   "PasswordManger",
   passwordMangerSchema
);

const fileMangerSchema = new Schema({
   id: String,
   name: String,
   file: String,
});

export const FileManger = new mongoose.model("FileManger", fileMangerSchema);
