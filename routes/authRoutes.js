/ Models
// *************************************************************
const db = require("../models");

// Routes
// *************************************************************
module.exports = app => {
  app.post("/login/tenant",
    passport.authenticate('local'),
    (req, res) => {
      res.redirect('/landlord/properties/' + req.user.landlordid);
    }
  );

  app.post("/login/landlord",
    passport.authenticate('local'),
    (req, res) => {
      res.redirect('/tenant/maintenance/' + req.user.tenantid);
    }
  )
};
