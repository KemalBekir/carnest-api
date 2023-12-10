const { getById } = require("../services/car");

module.exports = () => async (req, res, next) => {
  const id = req.params.id;
  try {
    const car = await getById(id);
    res.locals.car = car;
    next();
  } catch (err) {
    res.status(404).json({ message: "Record not found" });
  }
};
