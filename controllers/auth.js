const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    docTitle: "Login",
    path: "/login",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  // res.cookie("loggedIn", true, {
  //   path: "/", // Cookie accessible on all routes
  //   maxAge: 3600000, // Optional: Cookie valid for 1 hour
  //   httpOnly: true, // Prevent access by client-side scripts
  //   // secure: true, // only cookie will be sent through https server
  // });

  //using session
  User.findById("6737c09c8c5a1d2ce909ef18")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
