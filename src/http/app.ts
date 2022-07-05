import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';

import 'express-async-errors';
import '../shared/container';

import swaggerFile from '../docs/swagger.json';
import { swaggerOptions } from '../docs/swaggerOptions';
import { AppError } from '../shared/errors/AppError';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, swaggerOptions),
);

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal Server Error - ${err.message}`,
    });
  },
);

export { app };
