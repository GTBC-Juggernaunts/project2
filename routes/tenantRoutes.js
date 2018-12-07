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
        const maintObj = {
          hbsobj: data.map(d => d.get({ plain: true }))
        };
        // console.log(maintObj);
        console.log(maintObj.hbsobj[0].requesttype.type);
        res.render("tenant-maint", { maintRequest: data });
      });
  });

  // POST request to create new maintenance request
  app.post("/tenant/maintenance", (req, res) => {
    console.log(req.body);
    db.maintenancerequest
      .create({
        description: req.body.description
      })
      .then(data => {
        // res.render("tenant-maint", { maintRequest: data });
        const hbsObj = {
          maintRequest: data.map(d => d.get({ plain: true }))
        };
        // console.log(JSON.stringify(hbsObj,null,2));
        res.render("tenant-maint", hbsObj);
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
