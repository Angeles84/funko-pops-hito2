import { Router } from "express";
import { pizzaController } from "../controllers/pizza.controller.js";

const router = Router();

router.get("/", pizzaController.readPizzas);
router.get("/:id", pizzaController.readPizza);
router.put("/:id", pizzaController.updatePizza);

export default router;
