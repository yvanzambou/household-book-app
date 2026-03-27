import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import axios from "axios";

import Register from "./pages/Register";
import AddTransaction from "./pages/AddTransaction";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const api = axios.create({
  baseURL: "http://localhost:4000/api"
});

function App() {
  const [token, setToken] = useState(null);

  function logout() {
    setToken(null);
  }

  return (
    <BrowserRouter>
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <Link to="/" className="font-bold text-xl">Household Book</Link>

        <div className="space-x-4">
          {!token && (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}

          {token && (
            <>
              <Link to="/add" className="hover:underline">Add Transaction</Link>
              <button
                onClick={logout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            token ? <Dashboard token={token} /> : <Navigate to="/login" />
          }
        />

        <Route path="/add" element={<AddTransaction token={token} />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;