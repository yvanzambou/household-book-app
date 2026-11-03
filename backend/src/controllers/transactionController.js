import {
  addTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/transactionService.js";

const MAX_NOTE = 500;

// Prüft und bereinigt die Eingaben für Anlegen und Bearbeiten
function parseBody(body) {
  const type = body.type;
  const amount = Number(body.amount);
  const category = String(body.category ?? "").trim();
  const note = String(body.note ?? "").trim();
  let date = null;

  if (!["income", "expense"].includes(type)) return { error: "Ungültiger Typ." };
  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: "Der Betrag muss größer als 0 sein." };
  }
  if (!category) return { error: "Bitte gib eine Kategorie ein." };
  if (note.length > MAX_NOTE) {
    return { error: `Die Notiz darf höchstens ${MAX_NOTE} Zeichen lang sein.` };
  }
  if (body.date) {
    const d = new Date(body.date);
    if (Number.isNaN(d.getTime())) return { error: "Ungültiges Datum." };
    date = d.toISOString();
  }

  return { value: { type, amount, category, note, date } };
}

function parseId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: "Ungültige Buchungs-ID." });
    return null;
  }
  return id;
}

export async function createTransaction(req, res) {
  const { error, value } = parseBody(req.body);
  if (error) return res.status(400).json({ message: error });

  try {
    res.status(201).json(await addTransaction(req.user.id, value));
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Buchung konnte nicht gespeichert werden." });
  }
}

export async function listTransactions(req, res) {
  try {
    res.json(await getTransactions(req.user.id));
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Buchungen konnten nicht geladen werden." });
  }
}

export async function showTransaction(req, res) {
  const id = parseId(req, res);
  if (id === null) return;
  try {
    const tx = await getTransaction(req.user.id, id);
    if (!tx) return res.status(404).json({ message: "Buchung nicht gefunden." });
    res.json(tx);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Buchung konnte nicht geladen werden." });
  }
}

export async function editTransaction(req, res) {
  const id = parseId(req, res);
  if (id === null) return;

  const { error, value } = parseBody(req.body);
  if (error) return res.status(400).json({ message: error });

  try {
    const tx = await updateTransaction(req.user.id, id, value);
    if (!tx) return res.status(404).json({ message: "Buchung nicht gefunden." });
    res.json(tx);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Buchung konnte nicht geändert werden." });
  }
}

export async function removeTransaction(req, res) {
  const id = parseId(req, res);
  if (id === null) return;
  try {
    const ok = await deleteTransaction(req.user.id, id);
    if (!ok) return res.status(404).json({ message: "Buchung nicht gefunden." });
    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Buchung konnte nicht gelöscht werden." });
  }
}
