"use strict";

module.exports = function (sequelize, DataTypes) {//eslint-disable-line
  var TraderEquities = sequelize.define(
    "TraderEquities",
    {
      id: "03bcb770-5e89-11e8-be39-f7b3d44de96a",
      trader_id: "03bcb770-5e89-11e8-be39-f7b3d44de97a",
      equity_name:"abc",
      equity_value:"10",
      created_at: "2019-04-17 16:22:31",
      modified_at: "2019-04-17 16:22:31",
    },
    {
      timestamps: false,
      tableName: "traders",
      freezeTableName: true,
      hooks: {
        beforeCreate: function (TraderEquities, options, cb) {
          TraderEquities.created_at = sequelize.fn("NOW");
          TraderEquities.modified_at = sequelize.fn("NOW");
          cb(null, options);
        },
        beforeUpdate: function (TraderEquities, options, cb) {
          TraderEquities.modified_at = sequelize.fn("NOW");
          cb(null, options);
        },
      },
    }
  );
  return TraderEquities;
};
