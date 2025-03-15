const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "API documentation for managing contacts",
    version: "1.0.2",
  },
  host: "cse-341-project1-ffak.onrender.com",
  basePath: "/",
  schemes: ["http, https"],
};

const outputFile = "./docs/swagger.json";
const endpointsFiles = [require.resolve("./routes/contactRoutes.js")];

swaggerAutogen(outputFile, endpointsFiles, doc)
