import express from "express";
import morgan from "morgan";
// Routes
import suppliesRoutes from "./routes/supplies.routes.js";

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/supplies", suppliesRoutes);

export default app;
