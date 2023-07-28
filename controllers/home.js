export const home = (req, res) => {
   res.render("home", { user: req.user ,data : req.data });
};
