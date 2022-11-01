import express from "express";
import morgan from "morgan";
// Routes
import suppliesRoutes from "./routes/supplies.routes.js";
import suppliesAuthRoutes from "./routes/supplies.auth.routes.js";

const app = express();

// Settings
app.set("port", 3050);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/supplies", suppliesRoutes);
app.use("/api/suppplies/login", suppliesAuthRoutes);
export default app;
