import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./TestUsers/Login/Login";
// import RegisterForm from "./TestUsers/RegisterForm";
// import CategorySelection from "./TestUsers/";
import SubmittedTests from "./TestUsers/TestFeature/SubmittedTests";
import "./App.css";
import TestForm from "./TestUsers/TestFeature/TestPage";
import UserDashboard from "./TestUsers/UserDashboard/Userdashboard";
// import Homepage from "./TestUsers/Home";
import ViewTest from "./TestUsers/UserDashboard/ViewTest";
import ViewTestSchedule from "./TestUsers/UserDashboard/ViewTestSchedule";
import NotFoundPage from "./TestUsers/Miscellaneous/404Page";
import { AuthProvider } from "./TestUsers/Login/AuthContext";

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
          <Route
            path="/user/schedule/view/:id"
            element={<ViewTestSchedule />}
          ></Route>
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
