const Car = require("../models/carModel");

async function getAll() {
  return Car.find({});
}

module.exports = {
  getAll,
};
