const sinon = require("sinon");
const expect = require("chai").expect
const commonfunction = require("../../app/helpers/commonFunctions");

describe("commonfunctionTest", () => {
    it("isInteger should be called once", (done) => {
        const homeFuncSpy = sinon.spy(commonfunction, "isInteger");
        commonfunction.isInteger();
        expect(homeFuncSpy.callCount).to.equal(1);
        done();
    });

    it("commonfunction should throw exception on calling constructor", (done) => {
        expect(function(){
            new commonfunction();
        }).to.throw("A CommonFunctions class cannot be instantiated. As this is a static class");
        done();
    });
});
