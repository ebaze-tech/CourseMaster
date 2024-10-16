import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./TestUsers/Login";
// import RegisterForm from "./TestUsers/RegisterForm";
import CategorySelection from "./TestUsers/CategorySelection";
import SubmittedTests from "./TestUsers/SubmittedTests";
import "./App.css";
import TestForm from "./TestUsers/TestPage";
import UserDashboard from "./TestUsers/Userdashboard";
// import Homepage from "./TestUsers/Home";
import ViewTest from "./TestUsers/ViewTest";
import NotFoundPage from "./TestUsers/404Page";
import { AuthProvider } from "./token";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          {/* <Route path="/register" element={<RegisterForm />} /> */}
          <Route path="/test/category" element={<CategorySelection />} />
          <Route path="/test/new" element={<TestForm />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/test/result/all" element={<SubmittedTests />} />
          <Route path="/user/test/result/:id" element={<ViewTest />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
