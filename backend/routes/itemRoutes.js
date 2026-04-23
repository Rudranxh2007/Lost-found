const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");

// ADD ITEM
router.post("/", auth, async (req, res) => {
  try {
    const item = new Item({
      ...req.body,
      userId: req.user.id
    });

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: "Error adding item" });
  }
});

// GET ALL ITEMS
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching items" });
  }
});

// 🔥 SEARCH ITEM (move above :id)
router.get("/search/:name", async (req, res) => {
  try {
    const items = await Item.find({
      itemName: { $regex: req.params.name, $options: "i" }
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: "Search error" });
  }
});

// GET ITEM BY ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching item" });
  }
});

// UPDATE ITEM
router.put("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: "Update error" });
  }
});

// DELETE ITEM
router.delete("/:id", auth, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Delete error" });
  }
});

module.exports = router;