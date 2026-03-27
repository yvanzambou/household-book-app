import { addTransaction, getTransactions } from "../services/transactionService.js";

export async function createTransaction(req, res) {
  try {
    const tx = await addTransaction(req.user.id, req.body);
    res.status(201).json(tx);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

export async function listTransactions(req, res) {
  const list = await getTransactions(req.user.id);
  res.json(list);
}