const Car = require("../models/carModel");

async function getAll(page = 1, limit = 10) {
  try {
    const cars = await Car.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return cars;
  } catch (error) {
    throw new Error(`Error fetching cars: ${error.message}`);
  }
}

async function getById(id) {
  return Car.findById(id).populate({
    path: "owner",
    select: ["email", "username"],
  });
}

async function searchCars(filters) {
  try {
    const query = {};

    if (filters.make) {
      query.make = filters.make;
    }
    if (filters.model) {
      query.model = filters.model;
    }
    if (filters.gearbox) {
      query.gearbox = filters.gearbox;
    }
    if (filters.bodyType) {
      query.bodyType = filters.bodyType;
    }
    if (filters.specification) {
      query.specification = { $all: filters.specification };
    }
    // TODO: Add all possible fields

    const cars = await Car.find(query).exec();

    return cars;
  } catch (error) {
    throw new Error(`Error fetching cars: ${error.message}`);
  }
}

module.exports = {
  getAll,
  searchCars,
  getById,
};
