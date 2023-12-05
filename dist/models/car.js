"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carTypes_1 = require("../types/carTypes");
const CarMakeEnumValues = Object.keys({});
const validateModel = (value, make) => {
    const models = carTypes_1.CarModels[make];
    return models.includes(value);
};
const CarSchema = new mongoose_1.Schema({
    make: { type: String, required: true, enum: CarMakeEnumValues },
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
    specification: [{ type: String }], // Array of strings for features
    doors: { type: Number, required: true },
    seats: { type: Number, required: true },
});
const Car = (0, mongoose_1.model)("Car", CarSchema);
exports.default = Car;
