import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ token }) {
  const [transactions, setTransactions] = useState([]);

  async function loadTransactions() {
    const res = await fetch("http://localhost:4000/api/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
        <Pie data={chartData} />
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Transactions</h2>

      <ul className="space-y-2">
        {transactions.map((t) => (
          <li key={t.id} className="bg-gray-800 p-3 rounded">
            {t.type} – {t.amount} – {t.category}
          </li>
        ))}
      </ul>
    </div>
  );
}