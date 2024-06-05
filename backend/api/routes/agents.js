const router = require("express").Router();
const Agent = require("../models/Agent");
const bcrypt = require("bcrypt");
const verify = require("../verifyToken");

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.agent.id === req.params.id || req.agent.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedAgent = await Agent.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedAgent);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can only update your account!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.agent.id === req.params.id || req.agent.isAdmin) {
    try {
      await Agent.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can only delete your account!");
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json("Agent not found");
    }
    const { password, ...info } = agent._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.agent.isAdmin) {
    try {
      const agents = query ? await Agent.find().sort({ _id: -1 }).limit(5) : await Agent.find();
      res.status(200).json(agents);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users...");
  }
});

//GET USER STATS
router.get("/stats", verify, async (req, res) => { // Added verify middleware
  const today = new Date();
  const lastYear = new Date(today.setFullYear(today.getFullYear() - 1));

  try {
    const data = await Agent.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
