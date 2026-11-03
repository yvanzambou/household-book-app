import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg text-sm font-medium transition ${
    isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
  }`;

export default function Navbar() {
  const { token, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-100">
          <span className="text-2xl">💶</span> Haushaltsbuch
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {!token ? (
            <>
              <NavLink to="/login" className={linkClass}>Anmelden</NavLink>
              <NavLink to="/register" className={linkClass}>Registrieren</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" end className={linkClass}>Übersicht</NavLink>
              <NavLink to="/add" className={linkClass}>Neue Buchung</NavLink>
              <span className="hidden sm:inline text-slate-400 text-sm pl-2">
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="ml-1 rounded-lg ring-1 ring-slate-700 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
              >
                Abmelden
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
