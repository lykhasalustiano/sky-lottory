import { Router } from 'express';

import BetController from '../../controllers/v1/betController.js';
import authorization from '../../middlewares/authorization.js';

const betRouter = new Router();
const bet = new BetController();

betRouter.use(authorization);

betRouter.post('/place-bet', bet.placeBet.bind(bet));
betRouter.post('/resolve-bet', bet.resolveBet.bind(bet));
betRouter.get('/bet-history/:user_id', bet.getBetHistory.bind(bet));

export default betRouter;
