const expect = require("chai").expect;
const server = require("../../app");
const request = require("supertest")(server);
// Mock data
let sellEquityMock = require("../fixtures/sellEquity");
let sellEquityNegativeCaseMock = require("../fixtures/sellEquityNegativeCase");

describe("Sell Equity API", () => {
    it("should sell equity", (done) => {
        request
        .post("/broker/equity/sell")
        .set("Accept", "application/json")
        .send(sellEquityMock)
        .end((err, response) => {
            if (err){
                done(err);
            } else {
                expect(response.body.message).to.equal("equity sold successfully");
                expect(response.statusCode).to.equal(200);
                done();
            }
        });
    });
    it("should not sell equity as trader doesn't have equity", (done) => {
        request
        .post("/broker/equity/sell")
        .set("Accept", "application/json")
        .send(sellEquityNegativeCaseMock)
        .end((err, response) => {
            if (err){
                done(err);
            } else {
                expect(response.body.message).to.equal("Trader doesn't have this equity for this amount");
                expect(response.statusCode).to.equal(400);
                done();
            }
        });
    });
});