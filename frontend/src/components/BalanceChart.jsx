import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { formatCurrency } from "../format";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = "#94a3b8";

// Zeigt den Saldo in der Mitte des Rings
const centerText = {
  id: "centerText",
  afterDraw(chart, _args, opts) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    const x = (chartArea.left + chartArea.right) / 2;
    const y = (chartArea.top + chartArea.bottom) / 2;
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#94a3b8";
    ctx.font = "500 13px Inter, system-ui, sans-serif";
    ctx.fillText("Saldo", x, y - 16);
    ctx.fillStyle = opts.color;
    ctx.font = "700 22px Inter, system-ui, sans-serif";
    ctx.fillText(opts.text, x, y + 8);
    ctx.restore();
  },
};

export default function BalanceChart({ income, expenses }) {
  const total = income + expenses;
  const saldo = income - expenses;

  if (total === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center text-slate-500">
        <div className="text-5xl mb-2">📊</div>
        <p className="text-sm">Noch keine Daten für das Diagramm.</p>
      </div>
    );
  }

  const data = {
    labels: ["Einnahmen", "Ausgaben"],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ["#34d399", "#fb7185"],
        hoverBackgroundColor: ["#10b981", "#f43f5e"],
        borderColor: "#0f172a",
        borderWidth: 4,
        borderRadius: 8,
        spacing: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    cutout: "68%",
    maintainAspectRatio: false,
    animation: { animateRotate: true, duration: 800 },
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#cbd5e1", usePointStyle: true, pointStyle: "circle", padding: 18, font: { size: 13 } },
      },
      tooltip: {
        padding: 10,
        callbacks: {
          label: (ctx) => {
            const pct = ((ctx.parsed / total) * 100).toFixed(1).replace(".", ",");
            return ` ${ctx.label}: ${formatCurrency(ctx.parsed)} (${pct} %)`;
          },
        },
      },
      centerText: { text: formatCurrency(saldo), color: saldo >= 0 ? "#34d399" : "#fb7185" },
    },
  };

  return (
    <div className="h-72">
      <Doughnut data={data} options={options} plugins={[centerText]} />
    </div>
  );
}
