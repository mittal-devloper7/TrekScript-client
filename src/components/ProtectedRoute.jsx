import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Replace this with your actual authentication logic
  // e.g., checking localStorage, Redux store, or Auth Context
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children (the Home page)
  return children;
};

export default ProtectedRoute;
