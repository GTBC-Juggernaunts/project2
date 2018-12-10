// *************************************************************
var passport = require("passport");

// Routes
// *************************************************************
module.exports = app => {
  // Tenant login
  app.post("/login/tenant", function(req, res, next) {
    passport.authenticate("local", function(err, user) {
      if (err) {
        return next(err); // Not sure what this does
      }
      if (!user) {
        return res.status(401).redirect("/"); // If login/password don't match
      }
      // Logs user in for session
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        // Directs user to tenant maintenance page on successful login
        return res.redirect("/tenant/maintenance");
      });
    })(req, res, next);
  });

  // Landlord login
  app.post("/login/landlord", function(req, res, next) {
    console.log(req.body);
    passport.authenticate("local", function(err, user) {
      console.log(user);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).redirect("/"); //on failed login redirects to root page
      }
      //Logs user in for session
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        // Directs user to properties page
        return res.redirect("/landlord/properties");
      });
    })(req, res, next);
  });
};
