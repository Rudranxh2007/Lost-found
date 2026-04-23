const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");

// ADD ITEM
router.post("/", auth, async (req, res) => {
  const item = new Item({
    ...req.body,
    userId: req.user.id
  });

  await item.save();
  res.json(item);
});

// GET ALL ITEMS
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// GET ITEM BY ID
router.get("/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

// UPDATE ITEM
router.put("/:id", auth, async (req, res) => {
  const item = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(item);
});

// DELETE ITEM
router.delete("/:id", auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// SEARCH ITEM
router.get("/search/:name", async (req, res) => {
  const items = await Item.find({
    itemName: { $regex: req.params.name, $options: "i" }
  });
  res.json(items);
});

module.exports = router;
