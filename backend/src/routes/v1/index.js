import { Router } from 'express';

import homeRouter from './homeRoutes.js';
import accountRouter from './accountRoutes.js';
import gameRouter from './gameRoutes.js';
import profileRouter from './profileRoutes.js';
import historyRouter from './historyRoutes.js';

const v1 = new Router();

v1.use('/history', historyRouter);
v1.use('/account', accountRouter);
v1.use('/profile', profileRouter);
v1.use('/game', gameRouter);
v1.use('/', homeRouter);


export default v1;