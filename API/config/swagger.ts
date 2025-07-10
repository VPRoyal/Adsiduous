import swaggerJsdoc from "swagger-jsdoc"

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Multimedia Management API",
      version: "1.0.0",
      description: "RESTful API for multimedia file management with authentication",
    },
    servers: [
      {
        url: process.env.NODE_ENV === "production" ? "https://your-api-domain.com/api" : "http://localhost:3001/api",
        description: process.env.NODE_ENV === "production" ? "Production server" : "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
  },
  apis: ["./routes/*.js", "./models/*.js"],
}

export const swaggerSpec = swaggerJsdoc(swaggerOptions)