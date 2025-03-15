require("dotenv").config();
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const contactRoutes = require("./routes/contactRoutes.js");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

//Routes
app.use("/api", contactRoutes);



//Star the server
app.listen(PORT, () => {
  console.log(`Your API is running on: http://${HOST}:${PORT}/api/contacts`);
});
