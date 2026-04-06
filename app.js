import express from "express";
import cors from "cors";
import helmet from "helmet";

import { loadRoutes } from "./src/shared/utils/routeLoader.js";
import errorMiddleware from "./src/shared/middleware/error.middleware.js";
import { setupSwagger } from "./src/shared/config/swagger.js";

console.log("📦 Initializing Express App...");

const app = express();

app.use(helmet());
import cors from "cors";

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://rental-property-ase4-git-44e36f-austinpc280-gmailcoms-projects.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());

console.log("⚙️ Middlewares loaded");

// Health check
app.get("/", (req, res) => {
  console.log("🏥 Health check endpoint hit");
  res.json({ message: "Habalink API Running 🚀" });
});

// Auto load routes
await loadRoutes(app);

// Swagger docs
setupSwagger(app);

// Error handler
app.use(errorMiddleware);

console.log("✅ App configuration completed");

export default app;
