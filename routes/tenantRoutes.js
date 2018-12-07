// Dependencies
// *************************************************************
// model
const db = require("../models");

// Routes
// *************************************************************
module.exports = app => {
  // GET request to load maintenance page when a tenant logs in
  app.get("/tenant/maintenance/", (req, res) => {
    // get tenant id from route
    // const tenantId = req.params.id;
    // const tenantId = 1;

    db.maintenancerequest
      .findAll({
        where: { id: 1 },
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
  app.post("/tenant/maintenance", (req, res) => {
    console.log(req.body);
    db.maintenancerequest
      .create({
        requestType: req.body.requestType,
        description: req.body.description
      })
      .then(data => {
        // res.render("tenant-maint", { maintRequest: data });
        const hbsObj = {
          maintRequest: data.map(d => d.get({ plain: true }))
        };
        // console.log(data);
        res.render("tenant-maint", hbsObj);
      })
      .catch(err => {
        res.json(err);
      });
    // console.log(res);
  });

  // Load the payments page when a tenant logs in
  app.get("/tenant/payment", (req, res) => {
    db.payment
      .findAll({
        where: { id: 2 },
        include: [
          {
            model: db.paymentstatus
          }
          // lease model is not being associated for some reason
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

  // update payments
  // set paymentstatusid = 1
  // where leaseid = x

  // PUT request to update payment status to paid
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
