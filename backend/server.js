require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { sequelize } = require('./src/config/database');

const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');
const adminRoutes = require('./src/routes/admin');
const newsRoutes = require('./src/routes/news');
const { errorHandler } = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Scalable REST API',
    version: '1.0.0',
    description: 'API with Authentication & Role-Based Access',
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api/v1`,
    },
  ],
  tags: [
    {
      name: 'Auth',
      description: 'Authentication endpoints'
    },
    {
      name: 'Tasks',
      description: 'Task management endpoints'
    },
    {
      name: 'Admin',
      description: 'Admin-only endpoints'
    },
    {
      name: 'News',
      description: 'News endpoints'
    }
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          username: { type: 'string' },
          role: { type: 'string' }
        }
      },
      Task: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          title: { type: 'string' },
          description: { type: 'string' },
          status: { type: 'string', enum: ['pending', 'in_progress', 'completed'] },
          userId: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Register: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
          role: { type: 'string', enum: ['user', 'admin'] }
        }
      },
      Login: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' }
        }
      },
      AuthResponse: {
        type: 'object',
        properties: {
          token: { type: 'string' }
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
  security: [
    {
      bearerAuth: []
    }
  ]
};

const swaggerSpec = swaggerJsdoc(options);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  
// API versioning
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/news', newsRoutes);

// Error handling middleware
app.use(errorHandler);

// Sync database and start server
sequelize.sync().then(() => {
  console.log('Database connected and synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = app;
