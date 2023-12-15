const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const ImageSchema = new Schema(
  {
    url: {
      type: String,
      default: "/path/to/default-image.jpg", //TODO: replace this with your default image URL
    },
    car: {
      type: ObjectId,
      ref: "Car",
    },
  },
  { timestamps: true }
);

const Image = model("Image", ImageSchema);
