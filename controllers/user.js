const router = require("express").Router();
const { isGuest, isAuth, isOwner, isAdmin } = require("../middleware/guards");
const {
  register,
  login,
  logout,
  changePassword,
  getAllUsers,
} = require("../services/users");
const mapErrors = require("../utils/mappers");

router.get("/", isAuth(), isAdmin(), async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const usersData = await getAllUsers(page, limit);
    res.json(usersData);
  } catch (error) {
    res.status(500).json({ message: error.message || "Error fetching users" });
  }
});

router.post("/register", isGuest(), async (req, res) => {
  try {
    if (req.body.password.trim() == "" || req.body.email.trim() == "") {
      throw new Error("Email and password are required");
    }

    const result = await register(
      req.body.username,
      reqbody.email.trim().toLowerCase(),
      req.body.password.trim()
    );
    res.status(201).json(result);
  } catch (err) {
    console.error(err.message);
    const error = mapErrors(err);
    res.status(400).json({ message: errror });
  }
});

router.post("/login", isGuest(), async (req, res) => {
  try {
    const result = await login(
      req.body.email.trim().toLowerCase(),
      req.body.password.trim()
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    const error = mapErrors(err);
    res.status(400).json({ message: error });
  }
});

router.get("/logout", (req, res) => {
  logout(req.user?.token);
  res.status(204).end();
});

router.post("/change-password", isAuth(), async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  try {
    const result = await changePassword(userId, currentPassword, newPassword);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
  } catch (err) {
    console.error(err.message);
    const error = mapErrors(err);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
