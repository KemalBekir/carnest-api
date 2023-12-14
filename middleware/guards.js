function isAuth() {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: "Please log in!" });
    }
  };
}

function isGuest() {
  return (req, res, next) => {
    if (!req.user) {
      next();
    } else {
      res.status(400).json({ message: "You are already signed in" });
    }
  };
}

function isAdmin() {
  return (req, res, next) => {
    if (req.user.role === "admin") {
      next();
    } else {
      res
        .status(401)
        .json({ message: "You are not authorized to create new record" });
    }
  };
}

function isOwner() {
  return (req, res, next) => {
    if (
      req.user &&
      req.user._id == res.locals.car.owner._id &&
      req.user.role === "admin"
    ) {
      next();
    } else {
      res.status(403).json({ message: "You cannot modify this record" });
    }
  };
}

module.exports = {
  isAuth,
  isGuest,
  isOwner,
};
