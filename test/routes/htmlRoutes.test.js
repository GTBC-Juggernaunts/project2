const chai = require("chai").expect;
const chaihttp = require("chai-http");
// var should = chai.should();

chai.use(chaihttp);

describe("HTML Routes", function() {
  it("should /GET the home page");
  it("should /GET the about page");
  it("should open the registration page");
  it("should open the login page");
  it("should catch all routes not defined the login page");
});
