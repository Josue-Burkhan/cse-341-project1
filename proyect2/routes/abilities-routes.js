const express = require("express");
const router = express.Router();
const Ability = require("../models/Ability");

// GET all abilities
router.get("/", async (req, res) => {
  // #swagger.tags = ['Abilities']
  // #swagger.description = 'Retrieve all abilities'
  // #swagger.responses[200] = { description: 'Successfully retrieved abilities', schema: [{ "_id": "string", "name": "string", "description": "string", "element": "string" }] }
  // #swagger.responses[500] = { description: 'Server error' }
  try {
    const abilities = await Ability.find();
    res.json(abilities);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving abilities", error });
  }
});

// GET ability by ID
router.get("/:id", async (req, res) => {
  // #swagger.tags = ['Abilities']
  // #swagger.description = 'Retrieve a specific ability by ID'
  // #swagger.parameters['id'] = { description: 'Ability ID', required: true, type: 'string' }
  // #swagger.responses[200] = { description: 'Successfully retrieved ability' }
  // #swagger.responses[404] = { description: 'Ability not found' }
  // #swagger.responses[500] = { description: 'Server error' }
  try {
    const ability = await Ability.findById(req.params.id);
    if (!ability) return res.status(404).json({ message: "Ability not found" });
    res.json(ability);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// POST 
router.post("/", async (req, res) => {
  // #swagger.tags = ['Abilities']
  // #swagger.description = 'Create a new ability.'
  // #swagger.parameters['body'] = { in: 'body', description: 'Ability data', required: true, schema: { name: 'string', type: 'string', description: 'string', elements: [{ element: 'string', orbs: 0 }], knownUsers: ['string'] } }
  // #swagger.responses[201] = { description: 'Ability created successfully', schema: { _id: 'string', name: 'string', type: 'string', description: 'string', elements: [{ element: 'string', orbs: 0 }], knownUsers: ['string'] } }
  // #swagger.responses[400] = { description: 'Error creating ability', schema: { message: 'Error creating ability', error: {} } }
  try {
    if (req.body.elements && Array.isArray(req.body.elements)) {
      req.body.elements = req.body.elements.map(el => ({
        element: el.element,
        orbs: Number(el.orbs) || 0
      }));
    }

    const newAbility = new Ability(req.body);
    await newAbility.save();
    res.status(201).json(newAbility);
  } catch (error) {
    res.status(400).json({ message: "Error creating ability", error });
  }
});


// PUT 
router.put("/:id", async (req, res) => {
  /*  
  #swagger.tags = ['Abilities']  
  #swagger.description = 'Update an existing ability by ID.'  
  #swagger.parameters['id'] = { in: 'path', description: 'Ability ID', required: true, type: 'string' }  
  #swagger.parameters['body'] = { in: 'body', description: 'Updated ability data', required: true, schema: { name: 'string', type: 'string', description: 'string', elements: [{ element: 'string', orbs: 0 }], knownUsers: ['string'] } }  
  #swagger.responses[200] = { description: 'Ability updated successfully', schema: { _id: 'string', name: 'string', type: 'string', description: 'string', elements: [{ element: 'string', orbs: 0 }], knownUsers: ['string'] } }  
  #swagger.responses[400] = { description: 'Error updating ability', schema: { message: 'Error updating ability', error: {} } }  
  #swagger.responses[404] = { description: 'Ability not found', schema: { message: 'Ability not found' } }  
  */
  try {
    const existingAbility = await Ability.findById(req.params.id);
    if (!existingAbility) return res.status(404).json({ message: "Ability not found" });

    if (req.body.elements && Array.isArray(req.body.elements)) {
      req.body.elements = req.body.elements.map(el => ({
        element: el.element,
        orbs: Number(el.orbs) || 0
      }));
    }

    const updatedAbility = await Ability.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedAbility);
  } catch (error) {
    res.status(400).json({ message: "Error updating ability", error });
  }
});



// DELETE 
router.delete("/:id", async (req, res) => {
  /*  
  #swagger.tags = ['Abilities']  
  #swagger.description = 'Delete an ability by ID.'  
  #swagger.parameters['id'] = { in: 'path', description: 'Ability ID', required: true, type: 'string' }  
  #swagger.responses[200] = { description: 'Ability deleted successfully', schema: { message: 'Ability deleted successfully' } }  
  #swagger.responses[404] = { description: 'Ability not found', schema: { message: 'Ability not found' } }  
  #swagger.responses[500] = { description: 'Error deleting ability', schema: { message: 'Error deleting ability', error: {} } }  
  */  
  try {
    const deletedAbility = await Ability.findByIdAndDelete(req.params.id);
    if (!deletedAbility) return res.status(404).json({ message: "Ability not found" });
    res.json({ message: "Ability deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ability", error });
  }
});

module.exports = router;
