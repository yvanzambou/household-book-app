import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../api";
import { useAuth } from "../auth";
import { toLocalInput } from "../format";
import TransactionForm from "../components/TransactionForm";

export default function AddTransaction() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      await request("/transactions", { method: "POST", token, body: data });
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
        <h1 className="mb-6 text-2xl font-bold text-slate-100">Neue Buchung</h1>
        <TransactionForm
          initial={{ type: "expense", amount: "", category: "", note: "", date: toLocalInput() }}
          submitLabel="Speichern"
          loadingLabel="Speichert …"
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </main>
  );
}
