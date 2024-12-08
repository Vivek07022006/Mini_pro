const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Track registered users
});

module.exports = mongoose.model("Event", EventSchema);
