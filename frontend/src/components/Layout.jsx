import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

function Layout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="px-10 py-4 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold">DSA Sheets</h1>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-slate-400 hover:text-white">
            Home
          </Link>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-white"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="px-10 py-8 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}

export default Layout;
