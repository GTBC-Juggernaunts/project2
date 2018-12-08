// *************************************************************
var passport = require("passport");

// Routes
// *************************************************************
module.exports = app => {
  // app.post(
  //   "/login/tenant",
  //   passport.authenticate("local", {
  //     successRedirect: "tenant/maintenance/" + req.user.tenantid,
  //     failureRedirect: "/login",
  //     failureFlash: true
  //   })
  // );

  app.post("/login/landlord", function(req, res, next) {
    passport.authenticate("local", function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/");
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/landlord/properties");
      });
    })(req, res, next);
  });
};
