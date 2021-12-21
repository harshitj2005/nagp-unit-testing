"use strict";

const traderController = require("app/controllers/traderController");

module.exports = function(app) {
// Home route
    app.put("/trader/funds/add", traderController.addFunds);
};

