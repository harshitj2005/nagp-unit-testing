"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("traders", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      funds: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue:"0"
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      modified_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("traders");
  },
};
