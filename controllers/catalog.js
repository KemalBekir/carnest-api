const router = require("express").Router();
const mapErrors = require("../utils/mappers");
const { isAuth, isOwner } = require("../middleware/guards");
const api = require("../services/car");

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const data = await api.getAll(page, limit);
  res.json(data);
});

module.exports = router;
