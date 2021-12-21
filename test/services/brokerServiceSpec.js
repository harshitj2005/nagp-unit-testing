const sinon = require("sinon");
const expect = require("chai").expect
const brokerService = require("../../app/services/brokerService");

describe("brokerServiceTest", () => {
    it("checkIfAllowedToBuy should be called once", (done) => {
        const homeFuncSpy = sinon.spy(brokerService, "checkIfAllowedToBuy");
        brokerService.checkIfAllowedToBuy(new Date());
        expect(homeFuncSpy.callCount).to.equal(1);
        done();
    });
    it("checkIfAllowedToBuy should return false if currentDate is not allowed", (done) => {
        let dateObj = new Date();
        const currentDay = dateObj.getDay();
        const additionToMake = 6 - currentDay;
        dateObj.setDate(dateObj.getDate() + additionToMake);
        let resp = brokerService.checkIfAllowedToBuy(dateObj);
        expect(resp).to.equal(false);
        done();
    });

    it("checkIfAllowedToBuy should return false if currentTime is not allowed", (done) => {
        let dateObj = new Date();
        dateObj.setHours(20);
        let resp = brokerService.checkIfAllowedToBuy(dateObj);
        expect(resp).to.equal(false);
        done();
    });

    it("checkIfTraderHasSufficientFunds should be called once", (done) => {
        const homeFuncSpy = sinon.spy(brokerService, "checkIfTraderHasSufficientFunds");
        brokerService.checkIfTraderHasSufficientFunds();
        expect(homeFuncSpy.callCount).to.equal(1);
        done();
    });

    it("checkIfTraderHasSufficientFunds should return true if funds are sufficient", (done) => {
        let resp = brokerService.checkIfTraderHasSufficientFunds(10,9);
        expect(resp).to.equal(true);
        done();
    });

    it("checkIfTraderHasSufficientFunds should return false if funds are insufficient", (done) => {
        let resp = brokerService.checkIfTraderHasSufficientFunds(9,10);
        expect(resp).to.equal(false);
        done();
    });

});
