import { Router } from 'express';

import AccountController from '../../controllers/v1/accountController.js';
import authorization from '../../middlewares/authorization.js';
// import authentication from '../../middlewares/authentication.js';

const accountRouter = new Router();
const account = new AccountController();

accountRouter.use(authorization);

accountRouter.post('/sign-up', account.signUp.bind(account));
accountRouter.post('/sign-in', account.signIn.bind(account));

export default accountRouter;