const express = require("express");
const router = express.Router();
const Character = require("../models/Character");

//GET ALL
router.get("/", async (req, res) => {
  /*  
  #swagger.tags = ['Characters']  
  #swagger.description = 'Retrieve all characters.'  
  #swagger.responses[200] = { description: 'List of characters', schema: [{ _id: 'string', name: 'string', age: 'number', gender: 'string', race: 'string', nickname: 'string', appearance: { height: 'number', weight: 'number', eyeColor: 'string', hairColor: 'string', clothingStyle: 'string' }, personality: { traits: ['string'], strengths: ['string'], weaknesses: ['string'], quirks: ['string'] }, history: { birthplace: 'string', events: [{ year: 'number', description: 'string' }] }, relationships: { family: ['string'], friends: ['string'], enemies: ['string'], allies: ['string'], romance: ['string'] }, abilities: [{ name: 'string', elements: [{ element: 'string', orbs: 'number' }] }], coreRank: 'string' }] }  
  #swagger.responses[500] = { description: 'Error retrieving characters', schema: { message: 'Error retrieving characters', error: {} } }  
  */
  try {
    const characters = await Character.find().populate("abilities");
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving characters", error });
  }
});

// GET  ID
router.get("/:id", async (req, res) => {
  /*  
  #swagger.tags = ['Characters']  
  #swagger.description = 'Retrieve a character by ID.'  
  #swagger.parameters['id'] = { in: 'path', description: 'Character ID', required: true, type: 'string' }  
  #swagger.responses[200] = { description: 'Character data', schema: { _id: 'string', name: 'string', age: 'number', gender: 'string', race: 'string', nickname: 'string', appearance: { height: 'number', weight: 'number', eyeColor: 'string', hairColor: 'string', clothingStyle: 'string' }, personality: { traits: ['string'], strengths: ['string'], weaknesses: ['string'], quirks: ['string'] }, history: { birthplace: 'string', events: [{ year: 'number', description: 'string' }] }, relationships: { family: ['string'], friends: ['string'], enemies: ['string'], allies: ['string'], romance: ['string'] }, abilities: [{ name: 'string', elements: [{ element: 'string', orbs: 'number' }] }], coreRank: 'string' } }  
  #swagger.responses[404] = { description: 'Character not found', schema: { message: 'Character not found' } }  
  #swagger.responses[500] = { description: 'Server error', schema: { message: 'Server error', error: {} } }  
  */
  try {
    const character = await Character.findById(req.params.id).populate("abilities");
    if (!character) return res.status(404).json({ message: "Character not found" });
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// POST
router.post("/", async (req, res) => {
  /*  
    #swagger.tags = ['Characters']  
    #swagger.description = 'Create a new character.'  
    #swagger.parameters['body'] = {
      in: "body",
      description: "Character data",
      required: true,
      schema: {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "number" },
          gender: { type: "string" },
          race: { type: "string" },
          nickname: { type: "string" },
          appearance: { 
            type: "object",
            properties: {
              height: { type: "number" },
              weight: { type: "number" },
              eyeColor: { type: "string" },
              hairColor: { type: "string" },
              clothingStyle: { type: "string" }
            }
          },
          personality: { 
            type: "object",
            properties: {
              traits: { type: "array", items: { type: "string" } },
              strengths: { type: "array", items: { type: "string" } },
              weaknesses: { type: "array", items: { type: "string" } },
              quirks: { type: "array", items: { type: "string" } }
            }
          },
          history: { 
            type: "object",
            properties: {
              birthplace: { type: "string" },
              events: { type: "array", items: { 
                type: "object", 
                properties: { 
                  year: { type: "number" }, 
                  description: { type: "string" } 
                }
              }}
            }
          },
          relationships: { 
            type: "object",
            properties: {
              family: { type: "array", items: { type: "string" } },
              friends: { type: "array", items: { type: "string" } },
              enemies: { type: "array", items: { type: "string" } },
              allies: { type: "array", items: { type: "string" } },
              romance: { type: "array", items: { type: "string" } }
            }
          },
          abilities: { type: "array", items: { type: "string" } },
          coreRank: { type: "string", enum: ["Basic", "Beginner", "Intermediate", "Advanced", "Expert", "Legend", "Semi-God", "God"] }
        }
      }
    }
    #swagger.responses[201] = { description: 'Character created successfully', schema: { _id: 'string', name: 'string' } }  
    #swagger.responses[400] = { description: 'Error creating character', schema: { message: 'Error creating character', error: {} } }  
  */
  try {
    if (req.body.abilities && !Array.isArray(req.body.abilities)) {
      return res.status(400).json({ message: "Abilities must be an array of IDs" });
    }

    const newCharacter = new Character(req.body);
    await newCharacter.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(400).json({ message: "Error creating character", error });
  }
});



// PUT - Update a character by ID
router.put("/:id", async (req, res) => {
  /*  
      #swagger.tags = ['Characters']  
      #swagger.description = 'Update an existing character by ID.'  
  
      #swagger.parameters['id'] = { 
        in: 'path', 
        description: 'Character ID', 
        required: true, 
        schema: { type: 'string' }  
      }  
  
      #swagger.parameters['body'] = { 
  in: 'body', 
  description: 'Updated character data', 
  required: true, 
  schema: { 
    name: 'string', 
    age: 0, 
    gender: 'string', 
    race: 'string', 
    nickname: 'string', 
    appearance: { 
      height: 0, 
      weight: 0, 
      eyeColor: 'string', 
      hairColor: 'string', 
      clothingStyle: 'string' 
    }, 
    personality: { 
      traits: ['string'], 
      strengths: ['string'], 
      weaknesses: ['string'], 
      quirks: ['string'] 
    }, 
    history: { 
      birthplace: 'string', 
      events: [{ year: 0, description: 'string' }] 
    }, 
    relationships: { 
      family: ['string'], 
      friends: ['string'], 
      enemies: ['string'], 
      allies: ['string'], 
      romance: ['string'] 
    }, 
    abilities: ['string'], 
    coreRank: 'string'
  } 
}

  
      #swagger.responses[200] = { 
        description: 'Character updated successfully', 
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                _id: { type: "string" },
                name: { type: "string" }
              }
            }
          }
        }
      }  
  
      #swagger.responses[404] = { 
        description: 'Character not found', 
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string", example: "Character not found" }
              }
            }
          }
        }
      }  
  
      #swagger.responses[400] = { 
        description: 'Error updating character', 
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string", example: "Error updating character" },
                error: { type: "object" }
              }
            }
          }
        }
      }  
  */
  try {
    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCharacter) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.json(updatedCharacter);
  } catch (error) {
    res.status(400).json({ message: "Error updating character", error });
  }
});


// DELETE 
router.delete("/:id", async (req, res) => {
  /*  
  #swagger.tags = ['Characters']  
  #swagger.description = 'Delete a character by ID.'  
  #swagger.parameters['id'] = { in: 'path', description: 'Character ID', required: true, type: 'string' }  
  #swagger.responses[200] = { description: 'Character deleted successfully', schema: { message: 'Character deleted successfully' } }  
  #swagger.responses[404] = { description: 'Character not found', schema: { message: 'Character not found' } }  
  #swagger.responses[500] = { description: 'Error deleting character', schema: { message: 'Error deleting character', error: {} } }  
  */
  try {
    const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
    if (!deletedCharacter) return res.status(404).json({ message: "Character not found" });
    res.json({ message: "Character deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting character", error });
  }
});

module.exports = router;
