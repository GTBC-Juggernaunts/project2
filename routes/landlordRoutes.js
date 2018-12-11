// Models
const db = require("../models");

// Routes
module.exports = app => {
  // GET all properties for this landlord
  app.get("/landlord/properties/:id", (req, res) => {
    if (req.isAuthenticated()) {
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
          res.render("landlord-properties", { property: data });
        });
    } else {
      res.send("👮 Dont think you should be here 👮");
    }
  });

  // POST for creating new property
  app.post("/landlord/properties/", (req, res) => {
    if (req.isAuthenticated()) {
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
    } else {
      res.send("👮 Dont think you should be here 👮");
    }
  });

  // GET all tenants for this landlord

  app.get("/landlord/tenants/:id", (req, res) => {
    if (req.isAuthenticated()) {
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
          res.render("landlord-tenants", { property: data });
        });
    } else {
      res.send("👮 Dont think you should be here 👮");
    }
  });

  // POST to create tenant/lease
  // DISABLED v2
  // app.post("/landlord/tenants/:id", (req, res) => {
  //   if (req.isAuthenticated()) {
  //     const newLease = {
  //       leasename: req.body.name,
  //       signdate: req.body.signDate,
  //       startdate: req.body.startDate,
  //       enddate: req.body.endDate,
  //       binaryfile: 1,
  //       isactive: req.body.active,
  //       landlordId: 1,
  //       propertyid: 3
  //     };
  //     db.lease
  //       .create(
  //         newLease
  //         // , {
  //         // include: [
  //         //   {
  //         //     model: db.tenant
  //         //   }
  //         // ]
  //         //   }
  //       )
  //       .then(data => {
  //         res.json(data);
  //       });
  //   } else {
  //     res.send("GET FUCKED SON!!!");
  //   }
  // });

  // GET all maintenance requests for this landlord
  app.get("/landlord/maintenance/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.maintenancerequest
        .findAll({
          where: { landlordId: req.params.id },

          include: [
            {
              model: db.requesttype
            },
            {
              model: db.landlord
            }
          ]
        })
        .then(data => {
          res.render("landlord-maint", { property: data });
        });
    } else {
      res.send("👮 Dont think you should be here 👮");
    }
  });

  // DELETE to resolve the maintenance request
  app.delete("/landlord/maintenance/:id", (req, res) => {
    if (req.isAuthenticated()) {
      console.log(req);
      db.maintenancerequest
        .destroy({
          where: { id: req.params.id }
        })
        .then(() => {
          res.redirect(204, "/landlord/maintenance/" + req.params.id);
        });
    } else {
      res.send("👮 Dont think you should be here 👮");
    }
  });

  // Logout User
  app.get("/logoutuser", function(req, res) {
    req.logout();
    req.session.destroy();
    res.status(204);
    res.redirect("/");
  });
};
