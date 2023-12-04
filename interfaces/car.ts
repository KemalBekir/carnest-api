import { CarMake } from "../types/carTypes";

export interface ICar {
  make: CarMake;
  model: string;
  price: number;
  age: number;
  mileage: number;
  fuelType: string;
  location: string;
  colour: string;
  bodyType: string;
  gearbox: string;
  engineSize: string;
  specification: string[]; // Array of different features
  doors: number;
  seats: number;
}
