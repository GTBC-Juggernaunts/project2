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

  // Register a new landlord or tenant
  app.post("/register", function(req, res) {
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
                console.log("------data below-------");
                console.log(data.id);
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
              res.json({ statusCode: 201, status: "Created" });
              res.redirect(201, "/");
            });
        }
      });
  });
};
