import { Router } from "express";
import { login, signup } from "../controllers/user-controller.js"
import authorizer from "../middlewares/authorizer.js";
import authenticator from "../middlewares/authenticator.js"

const router = Router();

router.post("/login", login);
router.post("/signup", signup);

router.use(authenticator);
router.use(authorizer("ADMISTRATOR"))

// crud usuário

export default router;
