import { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api"
});

function App() {
  const [token, setToken] = useState(null);
  const [transactions, setTransactions] = useState([]);

  async function login() {
    const res = await api.post("/auth/login", {
      email: "test@example.com",
      password: "password"
    });
    setToken(res.data.token);
  }

  async function loadTransactions() {
    const res = await api.get("/transactions", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTransactions(res.data);
  }

  useEffect(() => {
    if (token) {
      loadTransactions();
    }
  }, [token]);

  return (
    <div>
      <h1>Household Book</h1>
      {!token && <button onClick={login}>Login (Demo)</button>}
      {token && (
        <>
          <h2>Transactions</h2>
          <ul>
            {transactions.map(t => (
              <li key={t.id}>
                {t.type} - {t.amount} - {t.category}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;