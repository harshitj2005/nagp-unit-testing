"use strict";

var fs = require("fs");
var path = require("path");
var SequelizeMock = require("sequelize-mock");
var _ = require("lodash");
var config = require("../config/config");
var db = {};
var Sequelize = require("sequelize");
var sequelize = new SequelizeMock();

// loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(config.root + "/test/models")
  .filter(function (file) {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  // import model files and save model names
  .forEach(function (file) {
    var model = sequelize.import(
      path.join(config.root + "/test/models", file)
    );
    db[model.name] = model;
  });

// invoke associations on each of the models
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].options.hasOwnProperty("associate")) {
    db[modelName].options.associate(db);
  }
});

// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend(
  {
    sequelize: sequelize,
    Sequelize: Sequelize,
  },
  db
);
