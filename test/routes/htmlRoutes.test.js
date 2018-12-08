const chai = require("chai");
const expect = require("chai").expect;
const server = require("../../server");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("HTML Routes", function() {
  this.beforeEach(function() {
    requests = chai.request(server);
  });

  // Test Home Page
  it("should /GET the home page", () => {
    requests.get("/").end((err, res) => {
      var statusCode = res.status;

      // Assertions
      expect(statusCode).to.equal(200);
    });
  });

  // Test About Page
  it("should /GET the about page", () => {
    requests.get("/about-us").end((err, res) => {
      var statusCode = res.status;

      // Assertions
      expect(statusCode).to.equal(200);
    });
  });

  // Test for 404 error
  it("should catch all routes not defined the login page", () => {
    requests.get("/*").end((err, res) => {
      var statusCode = res.status;

      // Assertions
      expect(statusCode.to.equal(404));
    });
  });
});
