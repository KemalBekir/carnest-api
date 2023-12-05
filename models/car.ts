import { Document, Model, Schema, model } from "mongoose";
import { ICar } from "../interfaces/car";
import { CarModels, CarMake } from "../types/carTypes";

const CarMakeEnumValues: (keyof CarMake)[] = Object.keys(
  {} as CarMake
) as (keyof CarMake)[];

const validateModel = (value: string, make: keyof typeof CarModels) => {
  const models = CarModels[make];
  return models.includes(value);
};

const CarSchema: Schema = new Schema({
  make: { type: String, required: true, enum: CarMakeEnumValues },
  model: {
    type: String,
    required: true,
    validate: {
      validator: function (this: Document, value: string) {
        const make = this.get("make") as keyof typeof CarModels;
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

const Car = model("Car", CarSchema);

export default Car;
