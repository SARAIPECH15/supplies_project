import { Router } from "express";
import { methods as suppliesController } from "./../controllers/supplies.controller.js";

const router = Router();

router.get("/:table", suppliesController.getAll);
router.get("/:id", suppliesController.getAny);
router.post("/", suppliesController.addAny);
router.put("/:id", suppliesController.updateAny);
router.delete("/:id", suppliesController.deleteAny);

export default router;