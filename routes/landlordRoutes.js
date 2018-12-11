// Models
// *************************************************************
const db = require("../models");

// Routes
// *************************************************************
module.exports = app => {
  // GET all properties for this landlord
  app.get("/landlord/properties/:id", (req, res) => {
    db.property
      .findAll({
        where: { landlordId: req.params.id },
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
        console.log("------experiment below--------");
        console.log(data);
        res.render("landlord-properties", { property: data });
      });
  });

  // POST for creating new property

  app.post("/landlord/properties/", (req, res) => {
    console.log("--- Post received ---");
    console.log(req.body);
    db.property
      .create({
        address: req.body.address,
        description: req.body.description,
        capacity: req.body.capacity,
        rent: req.body.rent,
        landlordId: req.body.landlordId
      })
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        res.json(error);
      });
  });

  // GET all tenants for this landlord

  app.get("/landlord/tenants/:id", (req, res) => {
    landlordId = req.params.id;

    db.sequelize
      .query(
        `SELECT DISTINCT
       la.id as 'landlordId',
       la.name,
       t.name as 'tenantName',
       t.email,
       p.address,
       le.rent,
       le.isactive,
       le.signdate,
       le.startdate,
       le.enddate
      FROM landlords la
      INNER JOIN properties p on la.id = p.landlordId
      INNER JOIN leases le on p.id = le.propertyId
      INNER JOIN tenants t on le.tenantId = t.id
      WHERE la.id = ${landlordId}`,
        { type: db.Sequelize.QueryTypes.SELECT }
      )
      .then(data => {
        console.log("------ Tenant Data Below -------");
        console.log(data);
        res.render("landlord-tenants", { property: data });
      });
  });

  // POST to create tenant/lease
  app.post("/landlord/tenants/:id", (req, res) => {
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
