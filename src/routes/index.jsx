import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLogin from "../pages/login/Login";
import AppRegister from "../pages/register/Register";
import ProtectedRoute from "../routes/ProtectedRoute";
import AppDashboard from "../pages/dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AppLogin />} />
        <Route path="/register" element={<AppRegister />} />
        <Route path="/" element={<ProtectedRoute element={AppDashboard} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
