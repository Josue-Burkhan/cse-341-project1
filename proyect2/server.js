require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3200;

app.use(express.json());
app.use(cors());

mongoose
.connect(process.env.MONGO_URI, {
  useNewUrlparser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB."))
.catch((err) => console.error("MongoDB not connected.", err));


app.use("/api/contacts", require("./routes/routeContacts"));

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
});