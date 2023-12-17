const Car = require("../models/carModel");

async function getAll(page = 1, limit = 10) {
  try {
    const cars = await Car.find({})
      .populate({
        path: "images",
        select: "url", // Only select the 'url' field from the 'Image' model
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return cars;
  } catch (error) {
    throw new Error(`Error fetching cars: ${error.message}`);
  }
}

async function getById(id) {
  return Car.findById(id)
    .populate({
      path: "owner",
      select: ["email", "username"],
    })
    .populate({
      path: "images",
      select: "url",
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

async function updateMultiple(cars) {
  const updatedCars = [];

  for (const car of cars) {
    const existing = await Car.findById(car._id);

    if (!existing) {
      continue;
    }
    existing.make = car.make;
    existing.model = car.model;
    existing.images = car.images.map((img) => {
      url: img.url;
    });

    existing.price = car.price;
    existing.age = car.age;
    existing.mileage = car.mileage;
    existing.fuelType = car.fuelType;
    existing.location = car.location;
    existing.colour = car.colour;
    existing.bodyType = car.bodyType;
    existing.gearbox = car.gearbox;
    existing.engineSize = car.engineSize;
    existing.specification = car.specification;
    existing.doors = car.doors;
    existing.seats = car.seats;
    existing.reserved = car.reserved;

    const result = await existing.save();
    updatedCars.push(result);
  }
  return updatedCars;
}

module.exports = {
  getAll,
  searchCars,
  getById,
  updateMultiple,
};
