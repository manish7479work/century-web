import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import PageNotFound from './components/PageNotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import { PROTECTED_ROUTES, ROUTES } from './constants/routeConstants';
import Overview from './pages/Overview';
import Chat from './pages/Chat';
import User from './pages/User';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      {/* ✅ Redirect from / to /login */}
      <Route index element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path={PROTECTED_ROUTES.DASHBOARD} element={<Dashboard />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="chat" element={<Chat />} />
          <Route path="user" element={<User />} />



          <Route path="settings" element={<div>Settings</div>} />
          <Route path="profile" element={<div>Profile</div>} />
          <Route path='fontend' element={<div>Fontend</div>} />
        </Route>
      </Route>


      <Route path={ROUTES.PAGE_NOT_FOUND} element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;
