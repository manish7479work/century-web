import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { AUTH, COLORS } from "../constants";
import { isTokenExpired } from "../utils/auth";
import { PROTECTED_ROUTES } from "../constants/routeConstants";
import loginBanner from "../assets/loginBanner.webp";
import { Button } from "antd";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../components/msauth/authConfig";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";


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


  const handleSignIn = () => {
    instance.loginPopup(loginRequest)
      .then(response => {
        console.log("Login successful:", response);
        localStorage.setItem(AUTH.BEARER_TOKEN, response?.accessToken);
        navigate("/dashboard"); // Redirect to dashboard
      })
      .catch(e => {
        console.error("Login failed");
        console.log(e);
      });
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
