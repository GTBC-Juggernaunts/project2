// Models
// *************************************************************
const db = require("../models");

// Routes
// *************************************************************
module.exports = app => {
  // GET request to load maintenance page when a tenant logs in
  app.get("/tenant/maintenance/", (req, res) => {
    // TODO: get tenantId from HTML after authentication
    // get tenant id from route
    // const tenantId = req.params.id;
    db.maintenancerequest
      .findAll({
        where: { tenantid: 1 }, // value will be req.params.id
        include: [
          {
            model: db.requesttype
          }
        ]
      })
      .then(data => {
        // console.log(data);
        res.render("tenant-maint", { maintRequest: data });
      });
  });

  // POST request to create new maintenance request
  // TODO: find out why the record is not inserting into DB
  // and why tenantId needs a default value when using create method
  app.post("/tenant/maintenance", (req, res) => {
    console.log("------------");
    console.log(req.body.tenantid);
    console.log("------------");
    db.maintenancerequest
      .create({
        requesttypeId: req.body.requesttypeId,
        description: req.body.description,
        propertyId: req.body.propertyId,
        landlordId: req.body.landlordId
        // tenantid: req.body.tenantid
      })
      .then(data => {
        // console.log(data);
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // GET all payments where leaseId relates to payment
  app.get("/tenant/payment", (req, res) => {
    db.payment
      .findAll({
        where: { leaseid: 1 },
        include: [
          {
            model: db.paymentstatus
          }
          // TODO: lease model is not being associated for some reason
          // need this in order to grab
          // ,
          // {
          //   model: db.lease
          // }
        ]
      })
      .then(data => {
        console.log(data);
        // console.log(data.payment[0].paymentstatus);
        res.render("tenant-payment", { payment: data });
      });
  });

  // PUT request to update payment status to paid
  // TODO: need to do the following update below, currently not updating paymentstatusid
  // update payments
  // set paymentstatusid = 1
  // where leaseid = x
  app.put("/tenant/payment/:id", (req, res) => {
    console.log(req.body);
    db.payment
      .update(
        {
          paymentstatusid: 2
        },
        {
          where: {
            leaseid: req.params.id
          }
        }
      )
      .then(data => {
        console.log(data);
        res.render("tenant-payment", data);
      })
      .catch(err => {
        res.json(err);
      });
    // console.log(res);
  });
};
