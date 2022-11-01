import { Router } from "express";
import { methods as suppliesController } from "./../controllers/supplies.controller.js";
const router = Router();
//rutas  generales

router.get("/:table", suppliesController.getAll);
router.get("/", suppliesController.getAny);
router.post("/", suppliesController.addAny);
router.post("/both", suppliesController.addAnyBulk);
router.put("/", suppliesController.updateAny);
router.delete("/", suppliesController.deleteAny);


export default router;