const express = require('express');
const { API_DOCS, CORS_ALLOWED_ORIGINS } = require('./config');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const { handleHealthCheck } = require('@kunalnagarco/healthie');
app.use(express.json());
app.use(handleHealthCheck());

app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

app.get('/', (req, res) => {
    res.send({});
});

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            version: "1.0.0",
            title: "Admin server API",
            description: "API Information of admin-server",
            contact: { name: "user@example.com", email: "user@example.com" },
            servers: [{ url: "http://localhost:3004", description: "Development server" }]
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/admin', require('./routes/admin_routes'));

app.use((req, res) => res.status(404).send('Not Found'));

module.exports = app;