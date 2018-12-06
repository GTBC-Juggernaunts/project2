// Dependencies
// *************************************************************
// model
const db = require("../models");

// Routes
// *************************************************************
module.exports = app => {
  // Load the maintenance page when a tenant logs in
  app.get("/tenant/maintenance", (req, res) => {
    res.render("tenant-maint", { maintRequest: "Hello World" });
  });

  // 
};
