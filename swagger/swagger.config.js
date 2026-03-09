const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Port de Russell',
      version: '1.0.0',
      description: 'Documentation de l\'API du Port de Russell pour la gestion des réservations de catways.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
         cookieAuth: {
           type: "apiKey",
           in: "cookie",
           name: "port_russell_token"
         }
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
    withCredentials: true
  },
  // Chemin vers les fichiers contenant les annotations JSDoc
  apis: ['./routes/**/*.js', './models/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec