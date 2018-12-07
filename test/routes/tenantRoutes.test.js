const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");
const db = require("../../models");
const expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /tenant/maintenance", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.maintenancerequest
      .bulkCreate([
        { description: "First Description" },
        { description: "Second Description" },
        { description: "Third Description" }
      ])
      .then(function() {
        // Request the route that returns all examples
        request.get("/teanant/maintenance").end(function(err, res) {
          var responseStatus = res.status;
          var responseBody = res.body;

          // Run assertions on the response

          expect(err).to.be.null;

          expect(responseStatus).to.equal(200);

          expect(responseBody)
            .to.be.an("array")
            .that.has.lengthOf(3);

          expect(responseBody[0])
            .to.be.an("object")
            .that.includes({ description: "First Description" });
          expect(responseBody[1])
            .to.be.an("object")
            .that.includes({ description: "Second Description" });
          expect(responseBody[2])
            .to.be.an("object")
            .that.includes({ description: "Third Description" });

          // The `done` function is used to end any asynchronous tests
          done();
        });
      });
  });
});
