import { lazy, Suspense } from "react";
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
import SubmittedTests from "./TestUsers/SubmittedTests";
import AdminTestView from "./TestUsers/AdminSubmittedTests";
import TestDetails from "./TestUsers/AdminTestDetails";
import "./App.css";
import AdminLoginForm from "./TestUsers/AdminLogin";
import AdminDashboard from "./TestUsers/AdminDashboard";
import AdminRegisterForm from "./TestUsers/AdminRegister";
import Leaderboard from "./TestUsers/Leaderboard";
import AdminTestUpload from "./TestUsers/AdminTestUpload";
import TestForm from "./TestUsers/TestPage";
import UserDashboard from "./TestUsers/Userdashboard";
import Homepage from "./TestUsers/Homepage";
import ViewTest from "./TestUsers/ViewTest";
import AdminHomePage from "./TestUsers/AdminHomepage";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/test/category" element={<CategorySelection />} />
          <Route path="/test/new" element={<TestForm />} />
          <Route path="/admin/tests" element={<AdminTestView />} />
          <Route path="/admin/tests/:id" element={<TestDetails />} />
          <Route path="/login/admin" element={<AdminLoginForm />} />
          <Route path="/register/admin" element={<AdminRegisterForm />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/admin/leaderboard" element={<Leaderboard />} />
          <Route path="/admin/test/upload" element={<AdminTestUpload />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/test/result/all" element={<SubmittedTests />} />
          <Route path="/user/test/result/:id" element={<ViewTest />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/admin" element={<AdminHomePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
export default App;
