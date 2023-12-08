const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const SpecificationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Store names in lowercase for case-insensitive comparison
  },
});

const Specification = model("Specification", SpecificationSchema);
module.exports = Specification;
