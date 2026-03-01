import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import C from "../Assets/C.png";
import C2 from "../Assets/C2.png";
import HTML from "../Assets/HTML.png";
import Python from "../Assets/Python.png";
import CSS from "../Assets/CSS.png";
import Java from "../Assets/Java.png";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", formData);
      const { access_token } = response.data;
      localStorage.setItem("accessToken", access_token);
      const decoded = jwtDecode(access_token);
      const userName = decoded.sub?.name || decoded.name || "User";
      login(userName);
      navigate("/");
      window.location.reload();
    } catch (error) {
      setMessage(error.response?.data?.error || "Invalid credentials!");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential: idToken } = credentialResponse;

      // Send Google ID token to your backend for verification
      const response = await axios.post("http://127.0.0.1:5000/api/google-login", { token: idToken });

      const { access_token } = response.data;
      localStorage.setItem("accessToken", access_token);

      const decoded = jwtDecode(access_token);
      const userName = decoded.sub?.name || decoded.name || "User";

      login(userName);
      navigate("/");
      window.location.reload();
    } catch (error) {
      setMessage("Google login failed!");
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="font-sans">
      <header className="relative text-center text-white p-10 md:p-16 flex flex-col items-center justify-center min-h-[90vh] bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#5318EB] before:to-[#AB6EF9] before:opacity-80">
        {/* Floating logos */}
        <img src={C} alt="C" className="absolute top-[10%] left-[10%] w-[10%] max-w-[80px] rotate-[-20deg] opacity-70" />
        <img src={C2} alt="C2" className="absolute top-[30%] right-[15%] w-[10%] max-w-[80px] rotate-[20deg] opacity-70" />
        <img src={HTML} alt="HTML" className="absolute top-[15%] right-[5%] w-[12%] max-w-[100px] rotate-[20deg] opacity-70" />
        <img src={Python} alt="Python" className="absolute bottom-[10%] left-[5%] w-[12%] max-w-[100px] rotate-[-40deg] opacity-70" />
        <img src={CSS} alt="CSS" className="absolute bottom-[5%] right-[5%] w-[10%] max-w-[80px] rotate-[-20deg] opacity-70" />
        <img src={Java} alt="Java" className="absolute bottom-[20%] left-[20%] w-[10%] max-w-[80px] rotate-[-20deg] opacity-70" />

        <div className="relative z-20 flex flex-col justify-center px-6 py-12 w-full max-w-md bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-bold tracking-tight text-white">Log in to your account</h2>

          {message && <p className="text-center text-sm font-semibold text-white mt-2">{message}</p>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white/20 px-3 py-2 text-gray-200 placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white/20 px-3 py-2 text-gray-200 placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-gradient-to-r from-[#5318EB] to-[#AB6EF9] px-4 py-2 text-white font-semibold shadow-md hover:opacity-80 transition-all"
            >
              Log in
            </button>
          </form>

          {/* Google login */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-white text-center">or</label>
            <hr className="my-2 border-white/30" />

            <div className="block w-full rounded-md bg-white/20 px-3 py-2 outline-none focus:ring-2 focus:ring-white">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => setMessage("Google Sign-in Failed")}
                width="100%" // makes it stretch inside the container
              />
            </div>
          </div>


          <p className="mt-4 text-center text-sm text-white font-semibold">
            <Link to="/Signin" className="underline">Create your account</Link>
          </p>
        </div>
      </header>
    </div>
  );
}

export default Login;
