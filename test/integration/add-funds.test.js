const expect = require("chai").expect;
const server = require("../../app");
const request = require("supertest")(server);
// Mock data
let addFundsMock = require("../fixtures/addFunds");

describe("Add Funds API", () => {
    it("should add funds to wallet", (done) => {
        request
        .put("/trader/funds/add")
        .set("Accept", "application/json")
        .send(addFundsMock)
        .end((err, response) => {
            if (err){
                done(err);
            } else {
                expect(response.body.message).to.equal("funds added successfully");
                expect(response.statusCode).to.equal(200);
                done();
            }
        });
    });
});