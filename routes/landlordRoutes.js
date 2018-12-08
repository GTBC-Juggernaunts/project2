// Models
// *************************************************************
const db = require("../models");

// Routes
// *************************************************************
module.exports = app => {
  // GET all properties for this landlord
  // TODO: need to get the landlordId from the handlebars to add as param in route
  app.get("/landlord/properties", (req, res) => {
    db.property
      .findAll({
        where: { landlordid: 1 }
      })
      .then(data => {
        res.render("landlord-properties", { property: data });
      });
  });

  app.get("/landlord/tenants", (req, res) => {
    db.tenant
      .findAll({
        // where: { landlord: 1 }
      })
      .then(data => {
        console.log(data);
        res.render("landlord-tenants", { tenant: data });
      });
  });
};
