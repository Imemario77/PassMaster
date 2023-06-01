export const home = (req, res) => {
   console.log(req.user);
   console.log(req.data);
   res.render("home", { user: req.user ,data : req.data });
};
