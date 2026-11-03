import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createTransaction,
  listTransactions,
  showTransaction,
  editTransaction,
  removeTransaction,
} from "../controllers/transactionController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", listTransactions);
router.post("/", createTransaction);
router.get("/:id", showTransaction);
router.put("/:id", editTransaction);
router.delete("/:id", removeTransaction);

export default router;
