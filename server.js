require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var Handlebars = require("handlebars");
var HandlebarsIntl = require("handlebars-intl");

var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
var session = require("express-session"),
  bodyParser = require("body-parser");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

HandlebarsIntl.registerWith(Handlebars);
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({ secret: "supersmashbros", resave: false, saveUnitialized: false }));

// Authentication Middleware
passport.use(
  new LocalStrategy(function(inputUsername, password, callback) {
    console.log("starting authentications");
    db.user
      .findOne({
        where: { username: inputUsername }
      })
      .then(data => {
        let user = data;
        if (!user) {
          return callback(null, false, { message: "No user found" });
        }
        if (user.password !== password) {
          return callback(null, false, { message: "Wrong password, try again OR DONT" });
        }
        return callback(null, user);
      });
  })
);

// Authentication Config to Serialize and Deserialize Users to keep their session authenticated
passport.serializeUser(function(user, cb) {
  console.log("serializing user...");
  cb(null, user.id);
});

passport.deserializeUser(function(inputId, cb) {
  console.log("deserializing user...");
  db.user.findOne({ where: { id: inputId } }).then(data => {
    let user = data;
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
require("./routes/tenantRoutes")(app);
require("./routes/landlordRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/authRoutes")(app);

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
