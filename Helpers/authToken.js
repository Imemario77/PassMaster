import jwt from "jsonwebtoken";

// Middleware for authenticating JWT
export function authenticateToken(req, res, next) {
   const secretKey =
      "772e2a2144401ecff752d3218313fe076cc2d1211334f0e6526f3d24c04fd74d82f679ed9e6ae30f8303d3ef8d0f0eb1f23c175092158403f4eb5ab254c130eb";
   const token = req.cookies.token;
   console.log("auth Token: " + token);
   if (token === null || undefined) {
      return res.redirect("/auth/login"); // Unauthorized
   }

   jwt.verify(token, secretKey, (err, user) => {
      if (err) {
         return res.redirect("/auth/login"); // Forbidden
      }

      req.user = user; // Attach the user information to the request object
      next();
   });
}

export function authenticateLogin_SignUp_Token(req, res, next) {
   const secretKey =
      "772e2a2144401ecff752d3218313fe076cc2d1211334f0e6526f3d24c04fd74d82f679ed9e6ae30f8303d3ef8d0f0eb1f23c175092158403f4eb5ab254c130eb";
   const token = req.cookies.token;
   console.log("auth Token: " + token);
   if (token === null || undefined) {
      next();
   } else {
      jwt.verify(token, secretKey, (err, user) => {
         if (err) {
            next();
         } else {
            req.user = user; // Attach the user information to the request object
            res.redirect("/manager/home") ;
         }
      });
   }
}
