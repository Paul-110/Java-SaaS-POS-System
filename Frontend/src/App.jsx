import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// Auth and Store Routes
import AuthRoutes from "./routes/AuthRoutes";
import StoreRoutes from "./routes/StoreRoutes";
import BranchManagerRoutes from "./routes/BranchManagerRoutes";
import Landing from "./pages/common/Landing/Landing";
import CashierRoutes from "./routes/CashierRoutes";
import Onboarding from "./pages/onboarding/Onboarding";
import SuperAdminRoutes from "./routes/SuperAdminRoutes";
import PageNotFound from "./pages/common/PageNotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import { getUserProfile } from "./Redux Toolkit/features/user/userThunks";

const App = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);
  const { store } = useSelector((state) => state.store);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUserProfile(jwt));
    }
  }, [dispatch]);

  useEffect(() => {
    function handleMove(e) {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mx', `${x}%`);
      document.documentElement.style.setProperty('--my', `${y}%`);
    }
    // subtle throttling
    let raf = null;
    function onMove(e) {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        handleMove(e);
        raf = null;
      });
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div id="formless-bg" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* Protected Routes */}
        <Route
          path="/super-admin/*"
          element={
            <ProtectedRoute roles={['ROLE_ADMIN']}>
              <SuperAdminRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/store/*"
          element={
            <ProtectedRoute roles={['ROLE_STORE_ADMIN', 'ROLE_STORE_MANAGER']}>
              <StoreRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/branch/*"
          element={
            <ProtectedRoute roles={['ROLE_BRANCH_MANAGER', 'ROLE_BRANCH_ADMIN']}>
              <BranchManagerRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cashier/*"
          element={
            <ProtectedRoute roles={['ROLE_BRANCH_CASHIER']}>
              <CashierRoutes />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
