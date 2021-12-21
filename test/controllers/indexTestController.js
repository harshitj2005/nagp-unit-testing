"use strict";

const expect = require("chai").expect;
const mocks = require("node-mocks-http");
const proxyquire = require("proxyquire").noCallThru();
let req = mocks.createRequest();
let res = mocks.createResponse();
const sinon = require("sinon");
const config = {};
const indexController = proxyquire("../../app/controllers/index", {
    "config/config":config
});

describe("index controller",()=>{
    it("home should be called once", (done) => {
        res.json = (responseObject) => {
            responseObject.should.have.property("responseCode");
        };
        const homeFuncSpy = sinon.spy(indexController, "home");
        indexController.home(req, res);
        expect(homeFuncSpy.callCount).to.equal(1);
        done();
    });

    it("home should return json if request accepts json", (done) => {
        res.jsonp = (responseObject) => {
            expect(responseObject).to.deep.equal({"info":"This is home"});
            done();
        };
        req.accepts = function(param) {
            if(param == "json"){
                return true;
            } else {
                return false
            }
        }
        indexController.home(req, res);
    });

    it("home should return txt if request accepts text", (done) => {
        res.type = (responseObject) => {
            expect(responseObject).to.equal("txt");
            done();
        };
        req.accepts = function(param) {
            if(param == "txt"){
                return true;
            } else {
                return false
            }
        }
        indexController.home(req, res);
    });
})