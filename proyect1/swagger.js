const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "API documentation for managing contacts",
    version: "1.0.2",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
};

const outputFile = "./docs/swagger.json";
const endpointsFiles = [require.resolve("./routes/contactRoutes.js")];

(async () => {
  try {
    await swaggerAutogen(outputFile, endpointsFiles, doc);
    console.log("Swagger documentation generated successfully.");
  } catch (err) {
    console.error("Error generating Swagger:", err);
  }
})();
