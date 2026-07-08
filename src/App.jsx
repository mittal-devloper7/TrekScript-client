import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-day-picker/style.css";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/home/Home";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the wrapper

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Redirect all other paths to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
