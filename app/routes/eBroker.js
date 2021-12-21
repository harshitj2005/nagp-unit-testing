"use strict";

const eBrokerController = require("app/controllers/eBrokerController");

module.exports = function(app) {
// Home route
    app.post("/broker/equity/buy", eBrokerController.buyEquity);
    app.post("/broker/equity/sell", eBrokerController.sellEquity);
};

