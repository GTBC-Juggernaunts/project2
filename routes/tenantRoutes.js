// Models
const db = require("../models");

// Routes
module.exports = app => {
  // GET request to load maintenance page when a tenant logs in
  app.get("/tenant/maintenance/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.maintenancerequest
        .findAll({
          where: { tenantid: req.params.id },
          include: [
            {
              model: db.requesttype
            },
            {
              model: db.tenant
            }
          ]
        })
        .then(data => {
          res.status(200).render("tenant-maint", { maintRequest: data });
        });
    } else {
      res.send("👮 Dont think you should be here 👮");
    }
  });

  // POST request to create new maintenance request
  app.post("/tenant/maintenance", (req, res) => {
    if (req.isAuthenticated()) {
      db.maintenancerequest
        .create({
          requesttypeId: req.body.requesttypeId,
          description: req.body.description,
          propertyId: req.body.propertyId,
          landlordId: req.body.landlordId,
          tenantId: req.body.tenantId
        })
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          res.json(err);
        });
    } else {
      res.send("👮 Dont think you should be here 👮");
    }
  });

  // GET all payments where leaseId relates to payment
  app.get("/tenant/payment/:id", (req, res) => {
    if (req.isAuthenticated()) {
      tenantID = req.params.id;

      db.sequelize
        .query(
          `SELECT
         p.datedue,
         p.paymentamt,
         ps.status,
         l.tenantId,
         l.id as leaseId,
         t.name,
         pr.address
         FROM payments p
         INNER JOIN paymentstatuses ps on ps.id = p.paymentstatusId
         INNER JOIN leases l on l.id = p.leaseId
         INNER JOIN tenants t on l.tenantId = t.id
         INNER JOIN properties pr on l.propertyid = pr.id
         Where t.id = ${tenantID}`,
          { type: db.Sequelize.QueryTypes.SELECT }
        )
        .then(returndata => {
          res.status(200).render("tenant-payment", { maintRequest: returndata });
        });
    } else {
      res.send("👮 Dont think you should be here 👮");
    }
  });

  // PUT request to update payment status to paid
  app.put("/tenant/payment/:id", (req, res) => {
    if (req.isAuthenticated()) {
      if (
        !req.body.name ||
        !req.body.address ||
        req.body.cardNumber.length > 16 ||
        req.body.cardNumber.length <= 15 ||
        !req.body.amount
      ) {
        return res.status(400).json({ status: "error" });
      }
      db.payment
        .update(
          {
            paymentstatusId: 1
          },
          {
            where: {
              leaseid: req.params.id
            }
          }
        )
        .then(data => {
          res.render("tenant-payment", data);
        })
        .catch(err => {
          res.json(err);
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
