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

  const getAccessToken = async (ms_acceess_token, phone) => {
    const URL = "login"
    const bodyData = {
      ms_access_token: ms_acceess_token,
      pno: phone
    }
    const { data } = await axiosInstance.post(URL, bodyData);
    // console.log(data)
    return data;

  }

  const handleSignIn = async () => {
    try {
      if (!phone) {
        toast.warning("Phone Number is Mandatory")
        return
      }

      const digits = String(phone).replace(/\D/g, '');

      if (digits.length !== 10) {
        toast.warning("Phone No. must be 10 digits");
        return;
      }
      setLoading(true)
      const response = await instance.loginPopup(loginRequest);

      const data = await getAccessToken(response?.accessToken, phone);
      if (data) {
        const role = data?.user_role === AUTH.ADMIN.toLowerCase() ? AUTH.ADMIN : AUTH.USER
        sessionStorage.setItem(AUTH.ROLE, role)
        sessionStorage.setItem(AUTH.BEARER_TOKEN, data?.access_token);

        navigate("/dashboard"); // Redirect to dashboard
      } else {
        toast.error("Unable to login...");
      }
    } catch (e) {
      toast.error("Login failed. Please try again.");
      console.error("Login failed:", e);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBanner})` }}
    >
      <div className=" w-[600px]">
        {loading && <Loading />}
        <LoginTemplate handleSignIn={handleSignIn} phone={phone} setPhone={setPhone} />
        {/* <Button onClick={handleSignIn} variant="contained">Sign In</Button> */}
      </div>
    </div>
  );
};




import century_icon from "../assets/century-icon.png"
import Loading from "../components/Loading";
import { Input } from "@mui/joy";
import { toast } from "react-toastify";
function LoginTemplate({ handleSignIn, phone, setPhone = () => { } }) {
  const VERSION = import.meta.env.VITE_VERSION ?? 0.0


  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Overlay */}

      {/* Login Card */}
      <div className=" bg-white h-full w-full text-center py-8 rounded-md">
        {/* Logo */}
        <img
          src={century_icon}
          alt="Century ply logo"
          className="mx-auto h-20 mb-4"
        />

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 font-helvetica">Login</h2>

        {/* Description */}
        <p className="text-gray-600 mb-6 font-helvetica">
          Use your CenturyPly Email Account
        </p>

        <Input
          placeholder="Enter Your Register Phone No."
          variant="outlined"
          className="w-[350px] mx-auto mb-6"
          onChange={(e) => setPhone(e.target.value)}
          type="number"
          sx={{ padding: "8px" }}
        // value={phone}
        />

        {/* Login Button */}
        <button
          className="bg-primary hover:bg-red-700 text-white font-semibold py-3 px-6 rounded font-helvetica text-base cursor-pointer"
          onClick={handleSignIn}
        >
          Sign in
        </button>

        {/* Version Info */}
        <p className="text-sm text-gray-500 mt-6 font-helvetica">
          Version {VERSION}
        </p>
      </div>
    </div >
  );
}
