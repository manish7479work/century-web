import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';
import { AUTH } from '../constants';
import { isTokenExpired } from '../utils/auth';
import { ROUTES } from '../constants/routeConstants';

const ProtectedRoute = () => {
  const token = localStorage.getItem(AUTH.BEARER_TOKEN);

  if (!token) return <Navigate to={ROUTES.LOGIN} />;

  try {
    const isExpired = isTokenExpired(token);
    if (isExpired) {
      localStorage.removeItem(constants.AUTH.BEARER_TOKEN);
      return <Navigate to={ROUTES.LOGIN} />;
    }

    return <Outlet />;
  } catch (err) {
    return <Navigate to={ROUTES.LOGIN} />;
  }
};

export default ProtectedRoute;
