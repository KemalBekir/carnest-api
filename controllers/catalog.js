const router = require("express").Router();
const mapErrors = require("../utils/mappers");
const { isAuth, isOwner } = require("../middleware/guards");
const api = require("../services/car");
const preload = require("../middleware/preload");

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const data = await api.getAll(page, limit);
  res.json(data);
});

router.get("/:id", preload(), (req, res) => {
  const car = res.locals.car;
  res.json(car);
});

module.exports = router;
