import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { AUTH, COLORS } from "../constants";
import { isTokenExpired } from "../utils/auth";
import { PROTECTED_ROUTES } from "../constants/routeConstants";
import loginBanner from "../assets/loginBanner.webp";
import { Button } from "antd";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../components/msauth/authConfig";
import axiosInstance from "../api/axios";


const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem(AUTH.BEARER_TOKEN);
    const isExpired = isTokenExpired(token);

    if (!isExpired) {
      navigate(PROTECTED_ROUTES.DASHBOARD);
    }
  });
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default Login;



const LoginPage = () => {
  const { instance } = useMsal();
  const navigate = useNavigate()

  const getAccessToken = async (ms_acceess_token) => {
    const URL = "login"
    const { data } = await axiosInstance.get(URL, {
      params: {
        ms_access_token: ms_acceess_token,
      },
    });
    // console.log(data)
    return data;


  }

  const handleSignIn = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);
      // console.log("Login successful:", response);

      const data = await getAccessToken(response?.accessToken);
      if (data) {
        localStorage.setItem(AUTH.BEARER_TOKEN, data?.access_token);
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        toast.error("Unable to login...");
      }
    } catch (e) {
      console.error("Login failed:", e);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBanner})` }}
    >
      <div className="h-[460px] w-[350px] border-2 border-solid border-blue-200 rounded-md backdrop-blur-sm flex justify-center items-center">
        <Button onClick={handleSignIn} variant="contained">Sign In</Button>
      </div>
    </div>
  );
};
