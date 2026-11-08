import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { request } from "../api";
import { useAuth } from "../auth";
import { formatCurrency, formatDateTime, TYP } from "../format";
import BalanceChart from "../components/BalanceChart";
import { TrashIcon, PencilIcon, ChevronIcon } from "../components/icons";

function greeting(name, justLoggedIn) {
  const h = new Date().getHours();
  const tageszeit = h < 11 ? "Guten Morgen" : h < 18 ? "Guten Tag" : "Guten Abend";
  return justLoggedIn ? `Willkommen zurück, ${name}! 👋` : `${tageszeit}, ${name}!`;
}

function Stat({ label, value, tone }) {
  const tones = {
    green: "text-emerald-400 bg-emerald-500/10",
    red: "text-rose-400 bg-rose-500/10",
  };
  return (
    <div className="card !p-5">
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className={`mt-2 inline-block rounded-lg px-2 py-0.5 text-2xl font-bold ${tones[tone]}`}>
        {value}
      </p>
    </div>
  );
}

function TransactionItem({ t, open, onToggle, onDelete }) {
  const income = t.type === "income";
  const panelId = `details-${t.id}`;

  return (
    <li
      className={`rounded-xl ring-1 transition duration-200 ${
        open
          ? "bg-slate-800/80 ring-emerald-500/40"
          : "ring-transparent hover:bg-slate-800/60 hover:ring-slate-700 hover:translate-x-0.5"
      }`}
    >
      <div className="flex items-center gap-2 px-3 py-3">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex min-w-0 flex-1 items-center gap-3 text-left cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
        >
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
            income ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"
          }`}>
            {income ? "↑" : "↓"}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-medium text-slate-100">{t.category}</span>
            <span className="block text-xs text-slate-400">{TYP[t.type]} · {formatDateTime(t.date)}</span>
          </span>
          <span className={`font-semibold whitespace-nowrap ${income ? "text-emerald-400" : "text-rose-400"}`}>
            {income ? "+" : "−"}{formatCurrency(t.amount)}
          </span>
          <ChevronIcon className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>

        <button
          type="button"
          onClick={onDelete}
          aria-label="Buchung löschen"
          title="Löschen"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-rose-500/15 hover:text-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50 cursor-pointer"
        >
          <TrashIcon />
        </button>
      </div>

      {/* Ausroll-Effekt: Höhe animiert von 0fr auf 1fr */}
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="flex items-end justify-between gap-4 px-3 pb-3 pl-16">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Notiz</p>
              {t.note ? (
                <p className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-300">{t.note}</p>
              ) : (
                <p className="mt-1 text-sm italic text-slate-500">Keine Notiz hinterlegt.</p>
              )}
            </div>
            <Link
              to={`/edit/${t.id}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-700/70 px-3 py-1.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
            >
              <PencilIcon className="h-4 w-4" /> Bearbeiten
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Dashboard() {
  const { token, user, logout, justLoggedIn } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState(null); // höchstens eine Buchung ist ausgeklappt

  useEffect(() => {
    let cancelled = false;
    request("/transactions", { token })
      .then((data) => !cancelled && setTransactions(data))
      .catch((err) => {
        if (cancelled) return;
        if (err.status === 401) logout();
        else setError(err.message);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [token, logout]);

  async function remove(id) {
    if (!window.confirm("Diese Buchung wirklich löschen?")) return;
    try {
      await request(`/transactions/${id}`, { method: "DELETE", token });
      setTransactions((list) => list.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const sum = (type) =>
    transactions.filter((t) => t.type === type).reduce((s, t) => s + Number(t.amount), 0);
  const income = sum("income");
  const expenses = sum("expense");
  const saldo = income - expenses;

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">
            {greeting(user?.name || "", justLoggedIn)}
          </h1>
          <p className="mt-1 text-slate-400">Hier ist die Übersicht über deine Finanzen.</p>
        </div>
        <Link to="/add" className="btn-primary">+ Neue Buchung</Link>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Einnahmen" value={formatCurrency(income)} tone="green" />
        <Stat label="Ausgaben" value={formatCurrency(expenses)} tone="red" />
        <Stat label="Saldo" value={formatCurrency(saldo)} tone={saldo >= 0 ? "green" : "red"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="card lg:col-span-2 self-start">
          <h2 className="mb-4 text-lg font-semibold text-slate-100">Einnahmen & Ausgaben</h2>
          <BalanceChart income={income} expenses={expenses} />
        </section>

        <section className="card lg:col-span-3">
          <h2 className="mb-4 text-lg font-semibold text-slate-100">Letzte Buchungen</h2>

          {loading ? (
            <p className="py-10 text-center text-slate-500">Wird geladen …</p>
          ) : transactions.length === 0 ? (
            <div className="py-10 text-center text-slate-500">
              <div className="mb-2 text-5xl">🧾</div>
              <p className="text-sm">Noch keine Buchungen vorhanden.</p>
              <Link to="/add" className="mt-3 inline-block text-sm font-medium text-emerald-400 hover:underline">
                Erste Buchung hinzufügen
              </Link>
            </div>
          ) : (
            <ul className="space-y-1">
              {transactions.map((t) => (
                <TransactionItem
                  key={t.id}
                  t={t}
                  open={openId === t.id}
                  onToggle={() => setOpenId(openId === t.id ? null : t.id)}
                  onDelete={() => remove(t.id)}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
