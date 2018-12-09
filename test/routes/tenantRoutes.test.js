const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");
const db = require("../../models");
const expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("POST /tenant/maintenance", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    request = chai.request(server);
    // db.sequelize.sync({ force: false }).then(function() {

    // });
    done();
  });

  it("should find all examples", function(done) {
    // db.landlord
    //   .bulkCreate([{ landlordname: "Pete", email: "peter@hotmail.com", tenantid: 1 }])
    //   .then(function() {
    // Add some examples to the db to test with
    db.maintenancerequest
      .create(
        {
          description: "First Description",
          landlordId: 2,
          requesttypeId: 1,
          propertyId: 1,
          tenantid: 1,
          requeststatus: "done",
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
        // { description: "Second Description", landlordId: 2, requesttypeId: 2, propertyId: 2 },
        // { description: "Third Description", landlordId: 3, requesttypeId: 3, propertyId: 3 }
      )
      .then(function() {
        // Request the route that returns all examples
        request.get("/teanant/maintenance").end(function(err, res) {
          var responseStatus = res.status;
          var responseBody = res.body;
          console.log(`Res status ${responseStatus}`);

          // Run assertions on the response

          expect(err).to.be.null;

          //   expect(responseStatus).to.equal(200);

          expect(responseBody)
            .to.be.an("array")
            .that.has.lengthOf(3);

          expect(responseBody[0])
            .to.be.an("object")
            .that.includes({
              description: "First Description",
              landlordId: 1,
              requesttypeId: 1,
              propertyId: 1,
              tenantid: 1,
              requeststatus: "done",
              createdAt: Date.now(),
              updatedAt: Date.now()
            });
          // The `done` function is used to end any asynchronous tests
          done();
        });
      });
    //   });
  });
});
