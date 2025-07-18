import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:8100',
    'https://editor.swagger.io',
    'https://bj-hotel-api.onrender.com',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(morgan('dev'));

// Swagger setup
const isProduction = process.env.NODE_ENV === 'production';
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Neural API',
      version: '1.0.0',
      description: 'API documentation for the Neural project',
    },
    servers: [
      {
        url: isProduction 
          ? 'https://bj-hotel-api.onrender.com/api/v1' 
          : 'http://localhost:3000/api/v1',
        description: isProduction ? 'Production' : 'Local Dev',
      }
    ],
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
  apis: ['./src/routes/api/v1/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use('/', routes);

export default app;
