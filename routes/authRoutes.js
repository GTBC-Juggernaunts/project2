// *************************************************************
var passport = require("passport");

// Routes
// *************************************************************
module.exports = app => {
  app.post(
    "/login/tenant",
    passport.authenticate("local", {
      successRedirect: "tenant/maintenance/" + req.user.tenantid,
      failureRedirect: "/login",
      failureFlash: true
    })
  );

  app.post(
    "/login/landlord",
    passport.authenticate("local", {
      successRedirect: "/landlord/properties/" + req.user.landlordid,
      failureRedirect: "/login",
      failureFlash: true
    })
  );
};
