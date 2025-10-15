const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// ✅ Swagger configuration options
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
        email: "amnesh.pal@uproi.in",
      },
    },

    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local Development Server",
      },
      {
        url: "https://your-deployed-domain.com/api",
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

  // ✅ Paths to route files for Swagger annotations
  apis: [
    "./routes/*.js", // includes all routes: authRoutes, productRoutes, cartRoutes, etc.
  ],
};

// ✅ Generate Swagger specification
const swaggerSpec = swaggerJSDoc(options);

// ✅ Function to integrate Swagger in Express app
const swaggerDocs = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true, // enables filter/search bar
      swaggerOptions: {
        persistAuthorization: true, // keep JWT after refresh
      },
      customSiteTitle: "Ecommerce API Docs | Amnesh Pal",
      customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .info h1 { font-size: 1.8rem; color: #2563eb; }
      `,
    })
  );

  console.log("📄 Swagger Docs available at: http://localhost:5000/api-docs");
};

module.exports = swaggerDocs;
