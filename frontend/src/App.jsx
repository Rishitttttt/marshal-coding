import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth.js";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Sheets from "./pages/Sheets.jsx";
import Topics from "./pages/Topics.jsx";
import Problems from "./pages/Problems.jsx";
import ProblemRoom from "./pages/ProblemRoom.jsx";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        />

        <Route
          path="/"
          element={isAuthenticated ? <Sheets /> : <Navigate to="/login" />}
        />

        <Route
          path="/sheets/:sheetId"
          element={isAuthenticated ? <Topics /> : <Navigate to="/login" />}
        />

        <Route
          path="/topics/:topicId"
          element={isAuthenticated ? <Problems /> : <Navigate to="/login" />}
        />

        <Route
          path="/problems/:problemId"
          element={
            isAuthenticated ? <ProblemRoom /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
