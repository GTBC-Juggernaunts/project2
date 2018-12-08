// *************************************************************
var passport = require("passport");

// Routes
// *************************************************************
module.exports = app => {
  app.post("/login/tenant", function(req, res, next) {
    passport.authenticate("local", function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/").status(401);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/tenant/maintenance");
      });
    })(req, res, next);
  });
};


  app.post("/login/landlord", function(req, res, next) {
    passport.authenticate("local", function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/").status(401);
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
