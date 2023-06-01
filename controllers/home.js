export const home = (req, res) => {
   console.log(req.user);
   res.render("home", {user:req.user});
};
