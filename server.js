require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var db = require("./models");
var users = require("./models/users.js");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Authentication Middleware
passport.use(new Strategy(
  function(inputUsername, password, callback) {
    users.findOne({ where: { username: inputUsername } })
      .then(data => {
        let user = data.map(d => d.get({ plain: true }));
        console.log(user);
        if (!user) { return callback(null, false); }
        if (user.password != password) { return callback(null, false); }
        return cb(null, user);
      })
  }
));

// Authentication Config to Serialize and Deserialize Users to keep their session authenticated
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(inputId, cb) {
  users.findOne({ where: { id: inputId } })
  .then(data => {
    let user = data.map(d => d.get({ plain: true }));
    cb(null, user);
  });
});


// Initialize Authentication
app.use(passport.initialize());

// Restore Authentication Session if Present
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = false;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
