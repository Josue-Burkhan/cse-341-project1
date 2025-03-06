const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();


router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contacts" });
  }
});


router.get("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
