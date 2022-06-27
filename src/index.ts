import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';

import './shared/container';

import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

export { app };
