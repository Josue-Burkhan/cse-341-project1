const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Wild Fantasy API",
    description: "API documentation for managing characters, factions, places, species, items, and more in the Wild Fantasy universe.",
    version: "1.0.0",
    contact: {
      name: "Joshua Burkhan"
    }
  },
  host: "cse-341-project1-1-wxiy.onrender.com",
  servers: ["cse-341-project1-1-wxiy.onrender.com"],
  basePath: "/",
  schemes: ["https"]
};

const outputFile = "./docs/swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
