import { Router } from "express";
import ProfileController from "../../controllers/v1/profileController.js";
import authorization from "../../middlewares/authorization.js";

const profileRouter = new Router();
const profile = new ProfileController();

profileRouter.use(authorization);

profileRouter.get("/info", profile.getProfile.bind(profile));
profileRouter.put("/deposit", profile.deposit.bind(profile));

export default profileRouter;