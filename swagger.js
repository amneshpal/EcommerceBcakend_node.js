// 






const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API Documentation",
      version: "1.0.0",
      description:
        "📘 Comprehensive API documentation for the **Ecommerce Backend** built with **Node.js, Express, and MongoDB**.\n\n" +
        "This documentation includes detailed routes for:\n" +
        "🔹 **Authentication (Signup, Login, Profile)**\n" +
        "🔹 **Products (CRUD, Reviews)**\n" +
        "🔹 **Cart (Add, Update, Delete)**\n" +
        "🔹 **Orders (Placement, Tracking)**\n" +
        "🔹 **Admin (Analytics, Management)**",
      contact: {
        name: "Backend Developer - Amnesh Pal",
        email: "amneshpal15@gmail.com",
      },
    },

    servers: [
      {
        url: "https://ecommercebcakend-node-js.onrender.com/api", // Use only the deployed URL
        description: "Production Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "🔐 Enter your JWT token here.\nExample: **Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...**",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./routes/*.js"], // all route files
};

// Generate Swagger specification
const swaggerSpec = swaggerJSDoc(options);

// Integrate Swagger in Express app
const swaggerDocs = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: "Ecommerce API Docs | Amnesh Pal",
      customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .info h1 { font-size: 1.8rem; color: #2563eb; }
      `,
    })
  );

  console.log("📄 Swagger Docs available at: https://ecommercebcakend-node-js.onrender.com/api-docs");
};

module.exports = swaggerDocs;
