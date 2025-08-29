//lipaRoute.ts
import express from "express";
import { handleStkPush } from "../controller/stkController";
import { generateToken } from "../middleware/generateToken";
const router = express.Router();
router.post("/stkpush", generateToken, handleStkPush);
export default router;
