import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import PageNotFound from './components/PageNotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import { PROTECTED_ROUTES, ROUTES } from './constants/routeConstants';
import Overview from './pages/Overview';
import Chat from './pages/Chat';
import User from './pages/User';
import Profile from './pages/Profile';
import { PageLayout } from './components/msauth/PageLayout';
import QnaHistory from './pages/QnaHistory';
import { AUTH } from './constants';

const AppRouter = () => {
  const [role, setRole] = useState(() => sessionStorage.getItem(AUTH.ROLE));
  const location = useLocation();

  useEffect(() => {
    const storedRole = sessionStorage.getItem(AUTH.ROLE);
    setRole(storedRole);
  }, [location]); // re-check role on every route change
  // Optionally: add a polling interval or storage listener if role changes mid-session

  const toOverview = role === AUTH.ADMIN;

  console.log(toOverview)

  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route index element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path={PROTECTED_ROUTES.DASHBOARD} element={<Dashboard />}>
          <Route index element={<Navigate to={toOverview ? 'overview' : 'chat'} replace />} />
          <Route path="chat" element={<Chat />} />
          {toOverview && (
            <>
              <Route path="overview" element={<Overview />} />
              <Route path="qna-history" element={<QnaHistory />} />
              <Route path="user" element={<User />} />
            </>
          )}
        </Route>
      </Route>

      <Route path="profile" element={<Profile />} />
      <Route path="loginpage" element={<PageLayout />} />
      <Route path={ROUTES.PAGE_NOT_FOUND} element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;
