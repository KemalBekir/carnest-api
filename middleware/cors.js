module.exports = () => (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, HEAD,PUT, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Authorization"
  );
  next();
};
