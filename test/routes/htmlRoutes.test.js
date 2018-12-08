const chai = require("chai");
const expect = require("chai").expect;
const server = require("../../server");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("HTML Routes", function() {
  this.beforeEach(function() {
    requests = chai.request(server);
  });

  it("should /GET the home page", () => {
    requests.get("/").end((err, res) => {
      var statusCode = res.status;

      // Assertions
      expect(statusCode).to.equal(200);
    });
  });

  it("should /GET the about page", () => {
    requests.get("/about-us").end((err, res) => {
      var statusCode = res.status;

      // Assertions
      expect(statusCode).to.equal(200);
    });
  });

  it("should open the registration page", () => {
    console.log();
  });

  it("should open the login page", () => {
    console.log();
  });

  it("should catch all routes not defined the login page", () => {
    console.log();
  });
});
