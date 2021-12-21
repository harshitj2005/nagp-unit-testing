const expect = require("chai").expect;
const server = require("../../app");
const request = require("supertest")(server);
// Mock data
let buyEquityMock = require("../fixtures/buyEquity");
let buyEquityNegativeCaseMock = require("../fixtures/buyEquityNegativeCase");

describe("Buy Equity API", () => {
    it("should buy equity", (done) => {
        request
        .post("/broker/equity/buy")
        .set("Accept", "application/json")
        .send(buyEquityMock)
        .end((err, response) => {
            if (err){
                done(err);
            } else {
                expect(response.body.message).to.equal("equity bought successfully");
                expect(response.statusCode).to.equal(200);
                done();
            }
        });
    });

    it("should not buy equity as funds insufficient", (done) => {
        request
        .post("/broker/equity/buy")
        .set("Accept", "application/json")
        .send(buyEquityNegativeCaseMock)
        .end((err, response) => {
            if (err){
                done(err);
            } else {
                expect(response.body.message).to.equal("no sufficiet funds available");
                expect(response.statusCode).to.equal(400);
                done();
            }
        });
    });
});