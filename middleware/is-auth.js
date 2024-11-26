module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    req.flash("error", "Your acces denied. Login first");
    return res.redirect("/login");
  }
  next();
};
