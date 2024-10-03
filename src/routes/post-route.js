import { Router } from "express";
import authenticator from "../middlewares/authenticator.js";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/post-controller.js";
const router = Router();

// Rotas públicas

router.use(authenticator);

// Rotas privadas
router.get("/", index);
router.get("/:id", show);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
