// Models
// *************************************************************
const db = require("../models");

// Routes
// *************************************************************
module.exports = app => {
  // GET all properties for this landlord
  // TODO: need to get the landlordId from the handlebars to add as param in route
  // uncomment below when were able to pass landlordid after authentication
  //   app.get("/landlord/properties/:id", (req, res) => {
  app.get("/landlord/properties", (req, res) => {
    db.property
      .findAll({
        // TODO: uncomment below when we are able to pass landlord id
        // where: { landlordId: req.params.id },
        where: { landlordId: 1 },
        include: [
          {
            model: db.lease,
            as: "lease"
          },
          {
            model: db.landlord
          }
        ]
      })
      .then(data => {
        console.log(data);
        res.render("landlord-properties", { property: data });
      });
  });

  // POST for creating new proerpty
  // TODO: uncomment below to create a propety and relate it to the logged in landlord
  //   app.post("/landlord/properties/:id", (req, res) => {
  app.post("/landlord/properties", (req, res) => {
    db.property
      .create({
        address: req.body.address,
        description: req.body.description,
        capacity: req.body.capacity,
        rent: req.body.rent,
        landlordId: req.body.landlordId //TODO: req.params.id will get this from data attribute
      })
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        res.json(error);
      });
  });

  // GET all tenants for this landlord
  // TODO: get all tenants by landlordId
  // this field doesn't exist in lease model
  app.get("/landlord/tenants", (req, res) => {
    db.lease
      .findAll({
        // where: { tenantid: 3 }
        // ,
        // include: [
        //   {
        //     model: db.tenant
        //   }
        // ,
        //   {
        //     model: db.payment
        //   }
        // ]
      })
      .then(data => {
        console.log(data);
        res.render("landlord-tenants", { tenant: data });
      });
  });

  // POST to create tenant/lease
  app.post("/landlord/tenants", (req, res) => {
    const newLease = {
      leasename: req.body.name,
      signdate: req.body.signDate,
      startdate: req.body.startDate,
      enddate: req.body.endDate,
      binaryfile: 1,
      isactive: req.body.active,
      landlordId: 1, // TODO: need landlord id as req.body.landlordId
      propertyid: 3 // TODO: need propertyId as req.body.propertyId
    };
    db.lease
      .create(
        newLease
        // , {
        // include: [
        //   {
        //     model: db.tenant
        //   }
        // ]
        //   }
      )
      .then(data => {
        res.json(data);
      });
  });

  // GET all maintenance requests for this landlord
  // TODO: get all maint reqs by maintId
  app.get("/landlord/maintenance", (req, res) => {
    db.maintenancerequest
      .findAll({
        // TODO: uncomment below out when landlordid is able to be passed
        // where: { landlordId: req.params.landlordId },
        where: { landlordId: 1 },
        include: [
          {
            model: db.requesttype
          }
        ]
      })
      .then(data => {
        console.log(data);
        res.render("landlord-maint", { maintRequests: data });
      });
  });

  // DELETE to resolve the maintenance request
  app.delete("/landlord/maintenance/:id", (req, res) => {
    db.maintenancerequest
      .destroy({
        where: { id: req.params.id }
      })
      .then(data => {
        res.json(data);
      });
  });
};
