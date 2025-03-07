const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  ipAddress: { type: String, required: true },
});


module.exports = mongoose.model("Contact", contactSchema);
