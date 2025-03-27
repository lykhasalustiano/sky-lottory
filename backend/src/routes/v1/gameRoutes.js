import { Router } from 'express';

import GameController from '../../controllers/v1/gameController.js';
import authorization from '../../middlewares/authorization.js';
// import authentication from '../../middlewares/authentication.js';

const gameRouter = new Router();
const game = new GameController();

gameRouter.use(authorization);

// Account creation for signing up routes
gameRouter.post('/bet', game.placeBet.bind(game));
gameRouter.post('/game-state', game.getGameState.bind(game));
gameRouter.post('/game-number', game.drawWinningNumbers.bind(game));




export default gameRouter;