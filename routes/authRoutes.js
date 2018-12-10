// *************************************************************
var passport = require("passport");
var db = require("../models");

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
        console.log("Wrong user");
        return res.redirect(401, "/"); // If login/password don't match
      }

      // Logs user in for session
      req.logIn(user, function(err) {
        let tenantID;
        if (err) {
          return next(err);
        }

        db.tenant
          .findOne({
            where: {
              userid: user.id
            }
          })
          .then(data => {
            console.log(data);
            tenantID = data.id;
            console.log(tenantID);
            return res.json({ route: "/tenant/maintenance/" + tenantID });
          });
        console.log(tenantID);
        return;
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
        return res.redirect(401, "/"); //on failed login redirects to root page
      }
      //Logs user in for session
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        // Directs user to properties page
        return res.redirect(302, "/landlord/properties");
      });
    })(req, res, next);
  });
};
