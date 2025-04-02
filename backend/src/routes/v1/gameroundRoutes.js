import { Router } from 'express';

import GameRoundController from '../../controllers/v1/gameroundController.js';
import authorization from '../../middlewares/authorization.js';

const gameroundRouter = new Router();
const gameRound = new GameRoundController();

gameroundRouter.use(authorization);

gameroundRouter.post('/start-round', gameRound.startRound.bind(gameRound));
gameroundRouter.get('/round-details/:round_id', gameRound.getRoundDetails.bind(gameRound));

export default gameroundRouter;