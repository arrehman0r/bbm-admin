import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLogin from "../pages/login/Login";
import AppRegister from "../pages/register/Register";
import ProtectedRoute from "../routes/ProtectedRoute";
import AppDashboard from "../pages/dashboard";
import Booking from "../pages/booking/Booking";
import VerifyEmail from "../pages/verfiy-email/VerifyEmail";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AppLogin />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/register" element={<AppRegister />} />
        <Route path="/" element={<ProtectedRoute element={AppDashboard} />} />
        <Route path="/booking" element={<ProtectedRoute element={Booking} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
