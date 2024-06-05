const router = require("express").Router();
const Property = require("../models/Property");
const verify = require("../verifyToken");

//CREATE LIST OF PROPERTY AS PER AGENT
router.post("/users/:id/property", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newProperty = new Property(req.body);

    try {
      const savedProperty = await newProperty.save();
      res.status(201).json(savedProperty);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE PROPERTY AS PER AGENT
router.delete("/users/:id/property/:propertyId", verify, async (req, res) => { // Added :propertyId
  if (req.user.isAdmin) { // Corrected req.user.isAdmin
    try {
      await Property.findByIdAndDelete(req.params.propertyId); // Use req.params.propertyId
      res.status(200).json("The property has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET PROPERTY AS PER AGENT
router.get("/users/:id/property", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let properties = [];

  try {
    if (typeQuery) {
      if (genreQuery) {
        properties = await Property.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        properties = await Property.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      properties = await Property.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(properties); // Corrected to properties
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
