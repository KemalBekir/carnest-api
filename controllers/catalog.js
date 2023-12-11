const router = require("express").Router();
const mapErrors = require("../utils/mappers");
const { isAuth, isOwner } = require("../middleware/guards");
const api = require("../services/car");
const preload = require("../middleware/preload");
const carFeatures = require("../types/carFeatures");

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const data = await api.getAll(page, limit);
  res.json(data);
});

router.get("/features", async (req, res) => {
  const data = carFeatures;
  res.json(data);
});

/*TODO: add middleware for Authenticated and Role */
router.post("/", async (req, res) => {
  const car = {
    make: req.body.make,
    model: req.body.model,
    images: req.body.images,
    price: req.body.price,
    age: req.body.age,
    mileage: req.body.mileage,
    fuelType: req.body.fuelType,
    location: req.body.location,
    colour: req.body.colour,
    bodyType: req.body.bodyType,
    gearbox: req.body.gearbox,
    engineSize: req.body.engineSize,
    specification: req.body.specification, // Array of strings for featurereq.body.s
    doors: req.body.doors,
    seats: req.body.seats,
    reserved: req.body.reserved,
  };

  try {
    const result = await api.create(car);
    res.status(201).json(result);
  } catch (err) {
    const error = mapErrors(err);
    console.error(err.message);
    res.status(400).json({ message: error });
  }
});

router.get("/:id", preload(), (req, res) => {
  const car = res.locals.car;
  res.json(car);
});

module.exports = router;
