const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/auth");
const Event = require("../models/Event");
const router = express.Router();

// Get all events (accessible to everyone)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create an event (Admin only)
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, date, location, description } = req.body;
    const event = new Event({ name, date, location, description });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an event (Admin only)
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an event (Admin only)
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register for an event (Logged-in users only)
router.post("/:id/register", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.registrations.push(req.user.id); // Add user to registrations
    await event.save();

    res.json({ message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
