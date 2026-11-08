const pad = (n) => String(n).padStart(2, "0");

export const formatCurrency = (n) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(n);

// "02.11.2026, 14:35" (lokale Zeit des Browsers)
export const formatDateTime = (iso) => {
  const d = new Date(iso);
  const datum = d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return `${datum}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// Wert für <input type="datetime-local"> ("YYYY-MM-DDTHH:mm", lokale Zeit)
export const toLocalDateTimeInput = (value = new Date()) => {
  const d = new Date(value);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// datetime-local-Wert -> ISO-String (UTC) fürs Backend
export const fromLocalDateTimeInput = (s) => new Date(s).toISOString();

export const TYP = { income: "Einnahme", expense: "Ausgabe" };