var passport = require("passport");
var db = require("../models");

// Routes
module.exports = app => {
  // Tenant login
  app.post("/login/tenant", function(req, res, next) {
    passport.authenticate("local", function(err, user) {
      if (err) {
        return next(err);
      }

      // If login/password don't match
      if (!user) {
        return res.redirect(401, "/");
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
            tenantID = data.id;
            return res.json({ route: "/tenant/maintenance/" + tenantID });
          });
        console.log(tenantID);
        return;
      });
    })(req, res, next);
  });

  // Landlord login
  app.post("/login/landlord", function(req, res, next) {
    passport.authenticate("local", function(err, user) {
      if (err) {
        return next(err);
      }

      //on failed login redirects to root page
      if (!user) {
        return res.redirect(401, "/");
      }

      //Logs user in for session
      req.logIn(user, function(err) {
        let landlordId;
        if (err) {
          return next(err);
        }

        //Finds Landlord Id from User Id
        console.log("user found, finding landlord");
        db.landlord
          .findOne({
            where: {
              userid: user.id
            }
          })
          .then(data => {
            landlordId = data.id;
            // Directs user to properties page
            return res.json({ route: "/landlord/properties/" + landlordId });
          });
      });
    })(req, res, next);
  });

  // Register a new landlord or tenant
  app.post("/register", function(req, res) {
    // Field Validation
    if (!req.body.userType || !req.body.name || !req.body.email || !req.body.password) {
      return res.status(451).json({ statusCode: 451, status: "error" });
    }
    // Search for a user that exist first
    db.user
      .findOne({
        where: {
          username: req.body.email
        }
      })
      .then(data => {
        // if we find existing user
        if (data) {
          return res.status(451).json({ statusCode: 451, status: "error" });
        } else {
          db.user
            .create({
              username: req.body.email,
              password: req.body.password
            })
            .then(data => {
              //create the appropriate record in either landlords or tenants
              if (req.body.userType === "Landlord") {
                db.landlord.create({
                  name: req.body.name,
                  email: req.body.email,
                  userId: data.id
                });
              } else {
                db.tenant.create({
                  name: req.body.name,
                  email: req.body.email,
                  userId: data.id
                });
              }
              res.redirect(201, "/");
            });
        }
      });
  });
};
