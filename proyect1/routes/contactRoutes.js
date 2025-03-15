const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Returns a list of all stored contacts in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of contacts.
 */
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contacts" });
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     description: Retrieves contact details based on the given ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the contact to retrieve.
 *     responses:
 *       200:
 *         description: Contact successfully retrieved.
 *       404:
 *         description: Contact not found.
 */
router.get("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Adds a new contact to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the contact.
 *               lastName:
 *                 type: string
 *                 description: The last name of the contact.
 *               email:
 *                 type: string
 *                 description: The email address of the contact.
 *               favoriteColor:
 *                 type: string
 *                 description: The contact's favorite color.
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: The contact's birthday.
 *     responses:
 *       201:
 *         description: Contact successfully created.
 *       400:
 *         description: Error creating contact.
 */
router.post("/contacts", async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const newContact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: "Error creating contact", error });
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     description: Updates the details of an existing contact based on the given ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the contact to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Contact successfully updated.
 *       400:
 *         description: Error updating contact.
 *       404:
 *         description: Contact not found.
 */
router.put("/contacts/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) return res.status(404).json({ message: "Contact not found" });
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: "Error updating contact", error });
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     description: Deletes a contact based on the given ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the contact to delete.
 *     responses:
 *       200:
 *         description: Contact successfully deleted.
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Error deleting contact.
 */
router.delete("/contacts/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
});

module.exports = router;
