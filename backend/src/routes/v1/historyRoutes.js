import { Router } from "express";
import HistoryController from "../../controllers/v1/historyController.js";
import authorization from "../../middlewares/authorization.js";

const historyRouter = new Router();
const history = new HistoryController();

historyRouter.use(authorization);

historyRouter.get("/history", history.getHistory.bind(history));
historyRouter.post("/add", history.addHistory.bind(history));

export default historyRouter;
