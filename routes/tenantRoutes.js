// Models
const db = require("../models");

// Routes
module.exports = app => {
  // GET request to load maintenance page when a tenant logs in
  app.get("/tenant/maintenance/:id", (req, res) => {
    db.maintenancerequest
      .findAll({
        where: { tenantid: req.params.id }, // value will be req.params.id
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
        console.log(data);
        res.status(200).render("tenant-maint", { maintRequest: data });
      });
  });

  // POST request to create new maintenance request
  app.post("/tenant/maintenance", (req, res) => {
    console.log(req.body);
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
  });

  // GET all payments where leaseId relates to payment
  app.get("/tenant/payment/:id", (req, res) => {
    tenantID = req.params.id;

    db.sequelize
      .query(
        `SELECT
       p.datedue,
       p.paymentamt,
       ps.status,
       l.tenantId,
       t.name,
       pr.address
       FROM payments p
       INNER JOIN paymentstatuses ps on ps.id = p.paymentstatusId
       INNER JOIN leases l on l.id = p.leaseId
       INNER JOIN tenants t on l.tenantId = ${tenantID}
       INNER JOIN properties pr on l.propertyid = pr.id`,
        { type: db.Sequelize.QueryTypes.SELECT }
      )
      .then(returndata => {
        console.log(returndata);
        res.status(200).render("tenant-payment", { maintRequest: returndata });
      });
  });

  // PUT request to update payment status to paid
  app.put("/tenant/payment/:id", (req, res) => {
    console.log(req.body);
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
  });
};
