"use strict";

module.exports = function (sequelize, DataTypes) {//eslint-disable-line
  var Trader = sequelize.define(
    "Trader",
    {
      id: "03bcb770-5e89-11e8-be39-f7b3d44de97a",
      funds: 10,
      created_at: "2019-04-17 16:22:31",
      modified_at: "2019-04-17 16:22:31",
    },
    {
      timestamps: false,
      tableName: "traders",
      freezeTableName: true,
      hooks: {
        beforeCreate: function (Trader, options, cb) {
          Trader.created_at = sequelize.fn("NOW");
          Trader.modified_at = sequelize.fn("NOW");
          cb(null, options);
        },
        beforeUpdate: function (Trader, options, cb) {
          Trader.modified_at = sequelize.fn("NOW");
          cb(null, options);
        },
      },
    }
  );
  return Trader;
};
