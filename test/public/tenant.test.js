const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../../server");
const tenant = require("../../public/js/tenant");

chai.use(chaiHttp);

// parent block
describe("Tenants", () => {
  // Test GET Routes for Maintenance Requests
  it("It should GET all maintenace requests for this tenant", done => {
    chai
      .request(server)
      .get(`/tenant/maintenance/${tenant.id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});
