import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { request } from "../api";
import { useAuth } from "../auth";
import { toLocalDateTimeInput } from "../format";
import TransactionForm from "../components/TransactionForm";

export default function EditTransaction() {
  const { id } = useParams();
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [tx, setTx] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    request(`/transactions/${id}`, { token })
      .then((data) => !cancelled && setTx(data))
      .catch((err) => {
        if (cancelled) return;
        if (err.status === 401) logout();
        else setLoadError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [id, token, logout]);

  const handleSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      await request(`/transactions/${id}`, { method: "PUT", token, body: data });
      navigate("/");
    } catch (err) {
      if (err.status === 401) return logout();
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <div className="card !p-8">
        <h1 className="mb-6 text-2xl font-bold text-slate-100">Buchung bearbeiten</h1>

        {loadError ? (
          <div className="space-y-4">
            <div className="alert-error">{loadError}</div>
            <Link to="/" className="btn-ghost w-full ring-1 ring-slate-700">Zurück zur Übersicht</Link>
          </div>
        ) : !tx ? (
          <p className="py-10 text-center text-slate-500">Wird geladen …</p>
        ) : (
          <TransactionForm
            initial={{
              type: tx.type,
              amount: String(tx.amount).replace(".", ","),
              category: tx.category,
              note: tx.note,
              date: toLocalDateTimeInput(tx.date),
            }}
            submitLabel="Speichern"
            loadingLabel="Speichert …"
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </main>
  );
}
