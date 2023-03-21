import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPages";
import SignupPage from "../pages/SignupPage";
import ProtectedRoutes from "../utils/ProtectedRoute";
import PublicRoutes from "../utils/PublicRoutes";
import ProfilePage from "../pages/ProfilePage";
import AdminLogin from "../components/AdminLogin/AdminLogin";
import AdminHomePage from "../pages/AdminHomePage";
import AdminEditPage from "../pages/AdminEditPage";
import CreateUserPage from "../pages/CreateUserPage";
import AdminProtectedRoutes from "../utils/AdminProtectedRoute";
import AdminPublicRoute from "../utils/AdminPublicRoute";

const MainRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route element={<AdminProtectedRoutes />}>
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/admin/edit/:id" element={<AdminEditPage />} />
            <Route path="/admin/create_user" element={<CreateUserPage />} />
          </Route>
          {/* <Route element={<AdminPublicRoute />}>
          </Route> */}
            <Route path="/adminlogin" element={<AdminLogin />} />
        </Routes>
      </Router>
    </div>
  );
};

export default MainRoutes;
