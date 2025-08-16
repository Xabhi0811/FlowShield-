import express from "express";
import BlockedSite from "../models/BlockedSite.js";
import { protectRoute } from "../middleware/auth.js";

const router = express.Router();

// Get all blocked sites for logged-in user
router.get("/", protectRoute, async (req, res) => {
  try {
    const sites = await BlockedSite.find({ userId: req.user._id });
    res.json(sites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a blocked site
router.post("/", protectRoute, async (req, res) => {
  try {
    const { url } = req.body;
    const newSite = new BlockedSite({ userId: req.user._id, url });
    await newSite.save();
    res.status(201).json(newSite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a blocked site
router.delete("/:id", protectRoute, async (req, res) => {
  try {
    await BlockedSite.findByIdAndDelete(req.params.id);
    res.json({ message: "Site removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
