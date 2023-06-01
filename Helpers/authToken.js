import jwt from "jsonwebtoken";

// Middleware for authenticating JWT
export function authenticateToken(req, res, next) {
   const token = req.cookies.token;
   console.log("auth Token: " + token);
   if (token === null || undefined) {
      return res.redirect("/auth/login"); // Unauthorized
   }

   jwt.verify(token, process.env.secretKey, (err, user) => {
      if (err) {
         return res.redirect("/auth/login"); // Forbidden
      }

      req.user = user; // Attach the user information to the request object
      next();
   });
}

export function authenticateLogin_SignUp_Token(req, res, next) {
   const token = req.cookies.token;
   console.log("auth Token: " + token);
   if (token === null || undefined) {
      next();
   } else {
      jwt.verify(token, process.env.secretKey, (err, user) => {
         if (err) {
            next();
         } else {
            req.user = user; // Attach the user information to the request object
            res.redirect("/manager/home");
         }
      });
   }
}
