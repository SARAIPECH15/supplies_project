import { Router } from "express";
import { methods as suppliesControllerAuth } from "./../controllers/supplies.auth.controller.js";
const router = Router();
//rutas auth 
router.post("/", suppliesControllerAuth.LogIn);

export default router;