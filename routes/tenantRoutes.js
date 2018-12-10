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
        res.status(200).render("tenant-maint", { maintRequest: data });
      });
  });

  // POST request to create new maintenance request
  app.post("/tenant/maintenance", (req, res) => {
    db.maintenancerequest
      .create({
        requesttypeId: req.body.requesttypeId,
        description: req.body.description,
        propertyId: req.body.propertyId,
        landlordId: req.body.landlordId,
        tenantid: req.body.tenantid
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
    db.lease
      .findOne({
        where: {
          tenantid: req.params.id
        }
      })
      .then(leaseData => {
        console.log(leaseData);
        db.payment
          .findAll({
            where: {
              leaseid: leaseData.id
            },
            include: [
              {
                model: db.paymentstatus
              }
            ]
          })
          .then(paymentData => {
            res.render("tenant-payment", { payment: paymentData });
          });
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
