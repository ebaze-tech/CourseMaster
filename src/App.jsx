import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import { AuthProvider } from "./Admin/AuthContext";
import LoginForm from "./TestUsers/LoginPage";
import RegisterForm from "./TestUsers/RegisterForm";
import CategorySelection from "./TestUsers/CategorySelection";
import SubmittedTests from "./Admin/SubmittedTests";
import TestDetails from "./Admin/TestDetails";
import "./App.css";
import AdminLoginForm from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminRegisterForm from "./Admin/AdminRegister";
import Leaderboard from "./TestUsers/Leaderboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/test" element={<CategorySelection />} />
        <Route path="/tests" element={<SubmittedTests />} />
        <Route path="/tests/:id" element={<TestDetails />} />
        <Route path="/login/admin" element={<AdminLoginForm />} />
        <Route path="/register/admin" element={<AdminRegisterForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />{" "}
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/leaderboard" element={<Leaderboard />} />{" "}
      </Routes>
    </Router>
  );
}
export default App;
