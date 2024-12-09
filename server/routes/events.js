const express = require('express');
const Event = require('../models/Event'); // Make sure this path is correct
const { verifyToken } = require('../middleware/auth'); // Import your authentication middleware
const router = express.Router();

// Add Event
router.post('/events', verifyToken, async (req, res) => {
  try {
    const { name, date, description } = req.body; // Ensure these match your schema

    // Validate required fields
    if (!name || !date || !description) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const event = new Event({
      name,
      date,
      description,
      createdBy: req.user.id, // Attach user ID if you're storing who created it
    });

    await event.save();
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all events
router.get('/events', verifyToken, async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get an event by ID
router.get('/events/:id', verifyToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update an event
router.put('/events/:id', verifyToken, async (req, res) => {
  try {
    const { name, date, description } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { name, date, description },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete an event
router.delete('/events/:id', verifyToken, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;