const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    surname: { type: String, required: true },
    address: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    linkedin: { type: String, required: true, unique: true },
    twitter: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", AgentSchema);
