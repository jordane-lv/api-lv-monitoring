import 'reflect-metadata';
import 'dotenv/config';
import '../shared/container';

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';

import swaggerFile from '../docs/swagger.json';
import { swaggerOptions } from '../docs/swaggerOptions';
import { customErrors } from './middlewares/CustomErrors';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, swaggerOptions),
);

app.use(routes);
app.use(customErrors);

export { app };
