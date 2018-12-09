// Models
// *************************************************************
const db = require("../models");

// Routes
// *************************************************************
module.exports = app => {
  // GET all properties for this landlord
  // TODO: need to get the landlordId from the handlebars to add as param in route
  app.get("/landlord/properties", (req, res) => {
    db.lease
      .findAll({
        where: { tenantid: 1 }
        // ,
        // include: [
        //   {
        //     model: db.property
        //   }
        // ]
      })
      .then(data => {
        console.log(data);
        res.render("landlord-properties", { property: data });
      });
  });

  // GET all tenants for this landlord
  // TODO: get all tenants
  app.get("/landlord/tenants", (req, res) => {
    db.tenant
      .findAll({
        where: { id: 1 }
      })
      .then(data => {
        // console.log(data);
        res.render("landlord-tenants", { tenant: data });
      });
  });

  // GET all maintenance requests for this landlord
  // TODO: get all maint reqs by maintId
  app.get("/landlord/maintenance", (req, res) => {
    db.maintenancerequest.findAll({}).then(data => {
      res.render("landlord-maint", { maintRequests: data });
    });
  });
};
