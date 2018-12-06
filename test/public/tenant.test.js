const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");
// const should = chai.should();
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

  // Test GET Routes for Payments
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
