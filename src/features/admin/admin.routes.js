// admin.routes.js
import express from "express";
import { adminLogin } from "./admin.controller.js"; // remove getDashboard if not defined

const router = express.Router();

router.post("/login", adminLogin);

// export default router
export default router;
