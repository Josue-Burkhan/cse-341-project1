require("dotenv").config();
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const abilityRoutes = require("./routes/abilities-routes.js");
const characterRoutes = require("./routes/characters-routes.js");
//const eventRoutes = require("./routes/events-routes.js");
//const factionRoutes = require("./routes/factions-routes.js");
//const itemRoutes = require("./routes/items-routes.js");
//const magicalObjectRoutes = require("./routes/magicalObjects-routes.js");
//const placeRoutes = require("./routes/places-routes.js");
//const speciesRoutes = require("./routes/species-routes.js");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//docs
app.use('/api-newworld-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


//Routes
app.use("/api/newworld/abilities", abilityRoutes);
app.use("/api/newworld/characters", characterRoutes);
//app.use("/api/newworld/events", eventRoutes);
//app.use("/api/newworld/factions", factionRoutes);
//app.use("/api/newworld/items", itemRoutes);
//app.use("/api/newworld/magical-objects", magicalObjectRoutes);
//app.use("/api/newworld/places", placeRoutes);
//app.use("/api/newworld/species", speciesRoutes);

//Star the server
app.listen(PORT, () => {
  console.log(`Your API is running on: http://${HOST}:${PORT}/api/contacts`);
});
