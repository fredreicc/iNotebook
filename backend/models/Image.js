const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  name: String,
  testImage: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = ImageModel = mongoose.model("Image", imgSchema);
