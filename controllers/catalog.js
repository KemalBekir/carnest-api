const router = require("express").Router();
const mapErrors = require("../utils/mappers");
const { isAuth, isOwner } = require("../middleware/guards");
const api = require("../services/car");

router.get("/", async (req, res) => {
  const data = await api.getAll();
  res.json(data);
});

module.exports = router;
