const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("./middleware/cors");
const catalogController = require("./controllers/catalog");

dotenv.config();
const PORT = process.env.PORT || 5050;

start();

async function start() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URI);
    console.log("Database ready");
  } catch (error) {
    console.log(error.message);
    console.error("Database connection failed");
  }

  mongoose.connection.on("disconnect", () => {
    console.log("mongoDB disconnected");
  });

  mongoose.connection.on("connected", () => {
    console.log("mongoDB connected");
  });

  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use("/catalog", catalogController);

  app.get("/", (req, res) => {
    res.json({ message: "REST service operational" });
  });

  app.listen(PORT, () => console.log(`REST service started on ${PORT}`));
}
