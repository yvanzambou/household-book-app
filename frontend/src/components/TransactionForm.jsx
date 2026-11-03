import { useState } from "react";
import { Link } from "react-router-dom";
import { fromLocalInput } from "../format";

const MAX_NOTE = 500;

// Gemeinsames Formular für "Neue Buchung" und "Buchung bearbeiten"
export default function TransactionForm({ initial, submitLabel, loadingLabel, onSubmit, loading, error }) {
  const [form, setForm] = useState(initial);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      type: form.type,
      amount: Number(form.amount.replace(",", ".")),
      category: form.category,
      note: form.note,
      date: fromLocalInput(form.date),
    });
  };

  return (
    <>
      {error && <div className="alert-error mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <span className="label">Art der Buchung</span>
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-800 p-1">
            {[["expense", "Ausgabe"], ["income", "Einnahme"]].map(([value, text]) => (
              <button key={value} type="button"
                onClick={() => setForm({ ...form, type: value })}
                className={`rounded-lg py-2 text-sm font-semibold transition cursor-pointer ${
                  form.type === value
                    ? value === "income"
                      ? "bg-emerald-600 text-white shadow"
                      : "bg-rose-500 text-white shadow"
                    : "text-slate-400 hover:bg-slate-700/60 hover:text-slate-200"
                }`}>
                {text}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label" htmlFor="amount">Betrag (€)</label>
          <input id="amount" type="text" inputMode="decimal" name="amount"
            value={form.amount} onChange={handleChange} required
            pattern="[0-9]+([.,][0-9]{1,2})?" title="Zum Beispiel 12,50"
            placeholder="0,00" className="input" />
        </div>

        <div>
          <label className="label" htmlFor="category">Kategorie</label>
          <input id="category" type="text" name="category" value={form.category}
            onChange={handleChange} required maxLength={100}
            placeholder="z. B. Lebensmittel, Miete, Gehalt" className="input" />
        </div>

        <div>
          <label className="label" htmlFor="date">Datum & Uhrzeit</label>
          <input id="date" type="datetime-local" name="date" value={form.date}
            onChange={handleChange} required className="input" />
        </div>

        <div>
          <label className="label" htmlFor="note">Notiz (optional)</label>
          <textarea id="note" name="note" value={form.note} onChange={handleChange}
            rows={3} maxLength={MAX_NOTE} placeholder="z. B. Wocheneinkauf bei Edeka"
            className="input resize-y" />
          <p className="mt-1 text-right text-xs text-slate-500">
            {form.note.length}/{MAX_NOTE}
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Link to="/" className="btn-ghost flex-1 ring-1 ring-slate-700">Abbrechen</Link>
          <button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading ? loadingLabel : submitLabel}
          </button>
        </div>
      </form>
    </>
  );
}
