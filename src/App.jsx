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
import AdminTestUpload from "./Admin/AdminTestUpload";
import TestForm from "./TestUsers/TestPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/test/category" element={<CategorySelection />} />
        <Route path="/test/new" element={<TestForm />} />
        <Route path="/admin/tests" element={<SubmittedTests />} />
        <Route path="/admin/tests/:id" element={<TestDetails />} />
        <Route path="/login/admin" element={<AdminLoginForm />} />
        <Route path="/register/admin" element={<AdminRegisterForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/admin/leaderboard" element={<Leaderboard />} />
        <Route path="/admin/test/upload" element={<AdminTestUpload />} />
      </Routes>
    </Router>
  );
}
export default App;
