import { Document, Model, Schema } from "mongoose";
import { ICar } from "../interfaces/car";

const CarSchema: Schema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
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
