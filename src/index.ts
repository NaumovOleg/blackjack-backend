import { Router } from 'express';
import { Express } from '@app/express';
import { gameRouter, cardRouter } from '@controllers/index';
import { config } from 'node-config-ts';
import env from 'dotenv';

import { Routes } from '@app/routes';
import { Bootstrap } from '@app/middlewares';
import { Providers } from '@app/providers';
import { Handler } from '@app/error-handlers';

env.config();

const router = Router().use('/api', gameRouter).use('/api', cardRouter);

const routes = new Routes(router);
const app = new Express(routes, Bootstrap, Providers, Handler);
app.listen(config.PORT);
