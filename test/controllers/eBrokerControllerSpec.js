"use strict";


const expect = require("chai").expect;
const mocks = require("node-mocks-http");
const proxyquire = require("proxyquire").noCallThru();
let req = mocks.createRequest();
let res = mocks.createResponse();
const sinon = require("sinon");
const dbStub = require("../db");
let brokerServiceMock = {
    checkIfAllowedToBuy:() => {
        return true;
    },
    checkIfTraderHasSufficientFunds:() => {
        return true;
    }
}
const eBrokerController = proxyquire("../../app/controllers/eBrokerController", {
    "../../config/sequelize":dbStub,
    "../services/brokerService":brokerServiceMock
});

describe("trader controller",()=>{
    afterEach(function () {
        dbStub.Trader.$queryInterface.$clearResults();
        dbStub.TraderEquities.$queryInterface.$clearResults();
    })
    describe("buyEquity", () => {
        it("buyEquity should be called once", (done) => {
            res.jsonp = (responseObject) => {
                responseObject.should.have.property("responseCode");
            };
            const buyEquityFuncSpy = sinon.spy(eBrokerController, "buyEquity");
            eBrokerController.buyEquity(req, res);
            expect(buyEquityFuncSpy.callCount).to.equal(1);
            done();
        });
    
        it("buyEquity should return 400 if trader id is not passed", (done) => {
            res.jsonp = (responseObject) => {
                expect(responseObject.responseCode).to.equal(400);
                done();
            };
            req.body = {"equityName":10,"equityValue":10};
            eBrokerController.buyEquity(req, res);
        });
    
        it("buyEquity should return 400 if equity name is not passed", (done) => {
            res.jsonp = (responseObject) => {
                expect(responseObject.responseCode).to.equal(400);
                done();
            };
            req.body = {"traderId":10,"equityValue":10};
            eBrokerController.buyEquity(req, res);
        });
    
        it("buyEquity should return 400 if equity value is not valid number", (done) => {
            res.jsonp = (responseObject) => {
                expect(responseObject.responseCode).to.equal(400);
                done();
            };
            req.body = {"traderId":10,"equityName":10};
            eBrokerController.buyEquity(req, res);
        });
    
        it("buyEquity should return 400 if trader is not found", (done) => {
            res.jsonp = (responseObject) => {
                expect(responseObject.responseCode).to.equal(400);
                done();
            };
            dbStub.Trader.$queryInterface.$useHandler(function (query,) {
                if (query == "findOne") {
                  return null;
                }
            });
            req.body = {"traderId":"123","equityName":"100","equityValue":"10"};
            eBrokerController.buyEquity(req, res);
        });
    
        it("buyEquity should return 500 if exception occur while query", (done) => {
            res.jsonp = (responseObject) => {
                expect(responseObject.responseCode).to.equal(500);
                done();
            };
            dbStub.Trader.$queryInterface.$useHandler(function (query,) {
                if (query == "findOne") {
                    return Promise.reject("custom error");
                }
            });
            req.body = {"traderId":"123","equityName":"100","equityValue":"10"};
            eBrokerController.buyEquity(req, res);
        });
        it("buyEquity should return 400 if timestamp is not allowed", (done) => {
            res.jsonp = (responseObject) => {
                expect(responseObject.responseCode).to.equal(400);
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
            let brokerServiceMock = {
                checkIfAllowedToBuy:() => {
                    return false;
                },
                checkIfTraderHasSufficientFunds:() => {
                    return true;
                }
            }
            const eBrokerControllerTemp = proxyquire("../../app/controllers/eBrokerController", {
                "../../config/sequelize":dbStub,
                "../services/brokerService":brokerServiceMock
            });
            req.body = {"traderId":"123","equityName":"100","equityValue":"10"};
            eBrokerControllerTemp.buyEquity(req, res);
        });

        it("buyEquity should return 400 if funds are in sufficient", (done) => {
            res.jsonp = (responseObject) => {
                expect(responseObject.responseCode).to.equal(400);
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
            let brokerServiceMock = {
                checkIfAllowedToBuy:() => {
                    return true;
                },
                checkIfTraderHasSufficientFunds:() => {
                    return false;
                }
            }
            const eBrokerControllerTemp = proxyquire("../../app/controllers/eBrokerController", {
                "../../config/sequelize":dbStub,
                "../services/brokerService":brokerServiceMock
            });
            req.body = {"traderId":"123","equityName":"100","equityValue":"10"};
            eBrokerControllerTemp.buyEquity(req, res);
        });
        it("buyEquity should return 200 if fund are sufficient in his wallet", (done) => {
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
            req.body = {"traderId":"123","equityName":"100","equityValue":"10"};
            eBrokerController.buyEquity(req, res);
        });
    });
    describe("sellEquity", () => {
        it("sellEquity should be called once", (done) => {
            res.jsonp = () => {
                // responseObject.should.have.property("responseCode");
            };
            const sellEquityFuncSpy = sinon.spy(eBrokerController, "sellEquity");
            eBrokerController.sellEquity(req, res);
            expect(sellEquityFuncSpy.callCount).to.equal(1);
            done();
        });
    
        it("sellEquity should return 400 if trader id is not passed", (done) => {
            res.jsonp = (responseObject) => {
                expect(responseObject.responseCode).to.equal(400);
                done();
            };
            req.body = {"equityName":10,"equityValue":10};
            eBrokerController.sellEquity(req, res);
        });
    
        it("sellEquity should return 400 if equity name is not passed", (done) => {
            res.jsonp = (responseObject) => {
                expect(responseObject.responseCode).to.equal(400);
                done();
            };
            req.body = {"traderId":10,"equityValue":10};
            eBrokerController.sellEquity(req, res);
        });
    
        it("sellEquity should return 400 if equity value is not valid number", (done) => {
            res.jsonp = (responseObject) => {
                expect(responseObject.responseCode).to.equal(400);
                done();
            };
            req.body = {"traderId":10,"equityName":10};
            eBrokerController.sellEquity(req, res);
        });
    
        it("sellEquity should return 400 if trader is not found", (done) => {
            res.jsonp = (responseObject) => {
                expect(responseObject.responseCode).to.equal(400);
                done();
            };
            dbStub.Trader.$queryInterface.$useHandler(function (query,) {
                if (query == "findOne") {
                  return null;
                }
            });
            req.body = {"traderId":"123","equityName":"100","equityValue":"10"};
            eBrokerController.sellEquity(req, res);
        });
    
        it("sellEquity should return 500 if exception occur while query", (done) => {
            res.jsonp = (responseObject) => {
                expect(responseObject.responseCode).to.equal(500);
                done();
            };
            dbStub.Trader.$queryInterface.$useHandler(function (query,) {
                if (query == "findOne") {
                    return Promise.reject("custom error");
                }
            });
            req.body = {"traderId":"123","equityName":"100","equityValue":"10"};
            eBrokerController.sellEquity(req, res);
        });

        it("sellEquity should return 400 if trader equity not found", (done) => {
            res.jsonp = (responseObject) => {
                expect(responseObject.responseCode).to.equal(400);
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
            dbStub.TraderEquities.$queryInterface.$useHandler(function (query,) {
                if (query == "findOne") {
                    return null
                }
            });
            req.body = {"traderId":"123","equityName":"100","equityValue":"10"};
            eBrokerController.sellEquity(req, res);
        });

        it("sellEquity should return 400 if timestamp is not allowed", (done) => {
            res.jsonp = (responseObject) => {
                expect(responseObject.responseCode).to.equal(400);
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
            let brokerServiceMock = {
                checkIfAllowedToBuy:() => {
                    return false;
                },
                checkIfTraderHasSufficientFunds:() => {
                    return true;
                }
            }
            const eBrokerControllerTemp = proxyquire("../../app/controllers/eBrokerController", {
                "../../config/sequelize":dbStub,
                "../services/brokerService":brokerServiceMock
            });
            req.body = {"traderId":"123","equityName":"100","equityValue":"10"};
            eBrokerControllerTemp.sellEquity(req, res);
        });

        it("sellEquity should return 200 if fund are sufficient in his wallet", (done) => {
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
            dbStub.TraderEquities.$queryInterface.$useHandler(function (query,) {
                if (query == "findOne") {
                    return dbStub.TraderEquities.build({
                        id: "123",
                        trader_id: "123",
                        equity_name:"100",
                        equity_value:"10"
                    });
                }
            });
            req.body = {"traderId":"123","equityName":"100","equityValue":"10"};
            eBrokerController.sellEquity(req, res);
        });
    });
})