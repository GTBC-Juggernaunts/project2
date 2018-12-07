// Dependencies
// *************************************************************
// model
// const db = require("../models");

// Routes
// *************************************************************
module.exports = app => {
  // GET request to load maintenance page when a tenant logs in
  app.get("/tenant/maintenance", (req, res) => {
    res.render("tenant-maint", { maintRequest: "Hello World" });
  });

  // POST request to create new maintenance request
  app.post("/tenant/maintenance", (req, res) => {
    console.log(req.body);
    console.log(res);
  });

  // Load the payments page when a tenant logs in
  app.get("/tenant/payment", (req, res) => {
    res.render("tenant-payment", { maintRequest: "Hello World" });
  });
};
