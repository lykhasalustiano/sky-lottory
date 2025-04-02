import { Router } from 'express';
import PotMoneyController from '../../controllers/v1/potmoneyController.js';
import authorization from '../../middlewares/authorization.js';

const potMoneyRouter = new Router();
const potMoney = new PotMoneyController();

potMoneyRouter.use(authorization);

potMoneyRouter.post('/add-money', potMoney.addMoney.bind(potMoney));
potMoneyRouter.post('/withdraw-money', potMoney.withdrawMoney.bind(potMoney));
potMoneyRouter.get('/balance/:pot_id', potMoney.getBalance.bind(potMoney));

export default potMoneyRouter;