import express from "express";
import { registerRoutes } from "../server/routes.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

await registerRoutes(app);

export default app;