import express from "express";
import ejs from "ejs";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import AuthRoute from "./route/auth.js";
import homeRoute from "./route/home.js";
import path from "path";
// app constant
const app = express();
const port = process.env.PORT || 8080;
const dirname = path.resolve();

//app middle wares
app.set("view engine", "ejs");
app.use(express.static(path.join(dirname, "public")));
app.use(cookieParser());
try {
   mongoose
      .connect(process.env.Db)
      .then(console.log("connection to database succesfull"));
} catch (e) {
   console.log(e);
}
app.use(express.json());
app.use(
   express.urlencoded({
      extended: true,
   })
);

//app routes
app.use("/auth", AuthRoute);
app.use("/manager", homeRoute);

// Error handling middleware
app.use((req, res, next) => {
   const err = new Error("Not Found");
   err.status = 404;
   next(err);
});

// Routes and other middleware go here...

app.use((err, req, res, next) => {
   res.status(err.status || 500);
   res.render("error", { error: err.message });
});

app.listen(port, () => console.log(`app started on port ${port}`));
