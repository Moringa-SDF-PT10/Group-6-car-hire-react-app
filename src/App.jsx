import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import BookingHistory from "./pages/BookingHistory";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/bookings" element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          } />
          <Route path="/bookings/history" element={
            <ProtectedRoute>
              <BookingHistory />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
