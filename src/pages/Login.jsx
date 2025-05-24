import React, { useEffect, useState } from "react";
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
    const token = sessionStorage.getItem(AUTH.BEARER_TOKEN);
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
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState(null)
  const dispatch = useDispatch()

  const getAccessToken = async (ms_acceess_token, phone) => {
    const URL = "login"
    const bodyData = {
      ms_access_token: ms_acceess_token,
    }
    const { data } = await axiosInstance.post(URL, bodyData,);
    // console.log(data)
    return data;

  }

  const handleSignIn = async () => {
    try {
      // if (!phone) {
      //   toast.warning("Phone Number is required");
      //   return;
      // }

      // const digits = String(phone).replace(/\D/g, '');
      // if (digits.length !== 10) {
      //   toast.warning("Phone Number must be exactly 10 digits");
      //   return;
      // }

      setLoading(true);

      // Attempt MSAL login
      let response;
      try {
        response = await instance.loginPopup(loginRequest);
      } catch (loginErr) {
        console.error("MSAL login failed:", loginErr);
        toast.error("Login popup failed. Please try again.");
        return;
      }

      // Try to fetch access token
      let data;
      try {
        data = await getAccessToken(response?.accessToken, phone);
      } catch (tokenErr) {
        console.error("Token fetch failed:", tokenErr);
        toast.error("Failed to retrieve token. Please try again.");
        return;
      }

      if (!data || !data.access_token || !data.role) {
        console.warn("Unexpected login response:", data);
        toast.error("Invalid login response. Please contact support.");
        return;
      }

      // Store phone and role in Redux + sessionStorage
      dispatch(addPhone(phone));
      sessionStorage.setItem(AUTH.PHONE, phone)
      const role =
        data.role.toLowerCase() === AUTH.ADMIN.toLowerCase()
          ? AUTH.ADMIN
          : AUTH.USER;

      sessionStorage.setItem(AUTH.ROLE, role);
      sessionStorage.setItem(AUTH.BEARER_TOKEN, data.access_token);

      navigate("/dashboard");
    } catch (err) {
      console.error("Unexpected login error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Blur Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-[5px]"
        style={{ backgroundImage: `url(${loginBanner})` }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-[28rem] h-[30rem] ">
          {loading && <Loading />}
          <LoginTemplate handleSignIn={handleSignIn} phone={phone} setPhone={setPhone} />
        </div>
      </div>
    </div>

  );
};

import century_icon from "../assets/century-icon.png"
import Loading from "../components/Loading";
import { Input } from "@mui/joy";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addPhone } from "../store/userSlice";
function LoginTemplate({ handleSignIn, phone, setPhone = () => { } }) {
  const VERSION = import.meta.env.VITE_VERSION ?? 0.0


  return (
    <div className="w-full h-full flex items-center justify-center ">
      {/* Overlay */}

      {/* Login Card */}
      {/* <div className="backdrop-blur-sm  border border-gray-300 h-full w-full text-center py-8 rounded-md"> */}
      <div className="bg-white flex flex-col gap-5 border-2 border-white h-full w-full text-center py-8 rounded-md">

        {/* Logo */}
        <img
          src={century_icon}
          alt="Century ply logo"
          className="mx-auto h-28"
        />

        {/* Title */}
        <h2 className="text-4xl font-semibold font-helvetica">Login</h2>

        {/* Description */}
        <p className="text-gray-600 font-helvetica">
          Use your CenturyPly Email Account
        </p>

        {/* <Input
          placeholder="Enter Your Register Phone No."
          variant="outlined"
          className="w-[350px] mx-auto "
          onChange={(e) => setPhone(e.target.value)}
          type="number"
          sx={{ padding: "8px" }}
        // value={phone}
        /> */}

        {/* Login Button */}
        <div >
          <button
            className="bg-primary hover:bg-red-700 text-white font-semibold py-2 px-5 rounded font-helvetica text-base cursor-pointer"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </div>

        {/* Version Info */}
        <p className="text-sm text-primary font-semibold font-helvetica">
          Version {VERSION}
        </p>
      </div>
    </div >
  );
}
