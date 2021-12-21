"use strict";

let data = [
  {
    id: "b6b7f62d-95c3-41e6-a8d3-7a3f4a13d867",
    funds: "0.00",
    created_at: new Date(),
    modified_at: new Date(),
  },
  {
    id: "7685c1d1-2032-417a-be2c-b5d55acc88d0",
    funds: "0.00",
    created_at: new Date(),
    modified_at: new Date(),
  },
];

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("traders", data);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("traders");
  },
};
