const db = require("../models");
const path = require("path");
module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.status(200);
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });

  // Load about page
  app.get("/about-us", (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, "../public/html/aboutus.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
