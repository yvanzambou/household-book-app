import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createTransaction, listTransactions } from "../controllers/transactionController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", listTransactions);
router.post("/", createTransaction);

export default router;