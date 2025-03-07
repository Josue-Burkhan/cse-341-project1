require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express;
const PORT = process.env.PORT || 3200;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

//Routes
app.use("/api/contacts", require("./routes/contactRoutes"));

//Star the server
app.listen(PORT, () => {
    console, log(`Server running on port ${PORT}`);
});
