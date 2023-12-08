const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const CarModels = require("../types/carTypes");

const CarMakeEnumValues = Object.keys(CarModels).reduce((acc, make) => {
  acc[make] = make;
  return acc;
}, {});

const CarSchema = new Schema({
  make: {
    type: String,
    required: true,
    enum: Object.values(CarMakeEnumValues),
  },
  model: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const make = this.get("make");
        return validateModel(value, make);
      },
      message: "Invalid model for the selected make.",
    },
  },
  price: { type: Number, required: true },
  age: { type: Number, required: true },
  mileage: { type: Number, required: true },
  fuelType: { type: String, required: true },
  location: { type: String, required: true },
  colour: { type: String, required: true },
  bodyType: { type: String, required: true },
  gearbox: { type: String, required: true },
  engineSize: { type: String, required: true },
  specification: [{ type: ObjectId, ref: "Specification" }], // Array of strings for features
  doors: { type: Number, required: true },
  seats: { type: Number, required: true },
});

const Car = model("Car", CarSchema);

module.exports = Car;
