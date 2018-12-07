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
    const tenantId = 1;

    db.maintenancerequest
      .findAll({
        where: {
          id: tenantId
        }
      })
      .then(data => {
        console.log(data);
        res.render("tenant-maint", { maintRequest: data });
      });
  });

  // POST request to create new maintenance request
  app.post("/tenant/maintenance", (req, res) => {
    console.log({ maintenanceRequest: req.body });
    db.maintenancerequest
      .create(req.body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
    // console.log(res);
  });

  // Load the payments page when a tenant logs in
  app.get("/tenant/payment", (req, res) => {
    res.render("tenant-payment", { maintRequest: "Hello World" });
  });
};
