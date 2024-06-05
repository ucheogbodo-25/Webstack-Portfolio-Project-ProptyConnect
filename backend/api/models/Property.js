const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    address: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    propertyType: { type: String, required: true },  // Changed to camelCase and removed unique
    bedroom: { type: Number, required: true },  // Changed to camelCase
    view1: { type: String, default: "" },  // Changed to camelCase
    view2: { type: String, default: "" },  // Changed to camelCase
    view3: { type: String, default: "" },  // Changed to camelCase
    view4: { type: String, default: "" },  // Changed to camelCase
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", PropertySchema);
