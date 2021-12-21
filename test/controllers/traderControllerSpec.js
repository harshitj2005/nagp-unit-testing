"use strict";


const expect = require("chai").expect;
const mocks = require("node-mocks-http");
const proxyquire = require("proxyquire").noCallThru();
let req = mocks.createRequest();
let res = mocks.createResponse();
const sinon = require("sinon");
const dbStub = require("../db");
const traderController = proxyquire("../../app/controllers/traderController", {
    "../../config/sequelize":dbStub
});

describe("trader controller",()=>{
    afterEach(function () {
        dbStub.Trader.$queryInterface.$clearResults();
    })
    it("addFunds should be called once", (done) => {
        res.jsonp = (responseObject) => {
            responseObject.should.have.property("responseCode");
        };
        const addFundsFuncSpy = sinon.spy(traderController, "addFunds");
        traderController.addFunds(req, res);
        expect(addFundsFuncSpy.callCount).to.equal(1);
        done();
    });

    it("addFunds should return 400 if trader id is not passed", (done) => {
        res.jsonp = (responseObject) => {
            expect(responseObject.responseCode).to.equal(400);
            done();
        };
        req.body = {"funds":10};
        traderController.addFunds(req, res);
    });

    it("addFunds should return 400 if funds is not passed", (done) => {
        res.jsonp = (responseObject) => {
            expect(responseObject.responseCode).to.equal(400);
            done();
        };
        req.body = {"traderId":"123"};
        traderController.addFunds(req, res);
    });

    it("addFunds should return 400 if funds passed is not valid number", (done) => {
        res.jsonp = (responseObject) => {
            expect(responseObject.responseCode).to.equal(400);
            done();
        };
        req.body = {"traderId":"123","funds":"abc"};
        traderController.addFunds(req, res);
    });

    it("addFunds should return 400 if trader is not found", (done) => {
        res.jsonp = (responseObject) => {
            expect(responseObject.responseCode).to.equal(400);
            done();
        };
        dbStub.Trader.$queryInterface.$useHandler(function (query,) {
            if (query == "findOne") {
              return null;
            }
        });
        req.body = {"traderId":"123","funds":"100"};
        traderController.addFunds(req, res);
    });

    it("addFunds should return 500 if exception occur while query", (done) => {
        res.jsonp = (responseObject) => {
            expect(responseObject.responseCode).to.equal(500);
            done();
        };
        dbStub.Trader.$queryInterface.$useHandler(function (query,) {
            if (query == "findOne") {
                return Promise.reject("custom error");
            }
        });
        req.body = {"traderId":"123","funds":"100"};
        traderController.addFunds(req, res);
    });

    it("addFunds should return 200 trader is found and funds added", (done) => {
        res.jsonp = (responseObject) => {
            expect(responseObject.responseCode).to.equal(200);
            done();
        };
        dbStub.Trader.$queryInterface.$useHandler(function (query,) {
            if (query == "findOne") {
                return dbStub.Trader.build({
                    id: "123",
                    funds: "10",
                });
            }
        });
        req.body = {"traderId":"123","funds":"100"};
        traderController.addFunds(req, res);
    });
})