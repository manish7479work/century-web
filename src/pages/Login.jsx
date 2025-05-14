import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH, COLORS } from '../constants';
import { isTokenExpired } from '../utils/auth';
import { PROTECTED_ROUTES } from '../constants/routeConstants';
import loginBanner from "../assets/loginBanner.webp"

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem(AUTH.BEARER_TOKEN);
    const isExpired = isTokenExpired(token);

    if (!isExpired) {
      navigate(PROTECTED_ROUTES.DASHBOARD);
    }
  });
  return <div>
    <LoginPage />
  </div>;
};

export default Login;


// import { COLORS } from "../constants/colors";

const LoginPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBanner})` }}
    >
      <div className='h-[460px] w-[350px] border-2 border-solid border-blue-200 rounded-md backdrop-blur-sm'>

      </div>
    </div>
  );
};

