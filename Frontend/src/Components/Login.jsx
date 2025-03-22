import React from "react";
import C from "../Assets/C.png";
import C2 from "../Assets/C2.png";
import HTML from "../Assets/HTML.png";
import Python from "../Assets/Python.png";
import CSS from "../Assets/CSS.png";
import Java from "../Assets/Java.png";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="font-sans">
      <header
        className="relative text-center text-white p-10 md:p-16 flex flex-col items-center justify-center min-h-[90vh] 
          bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#5318EB] before:to-[#AB6EF9] before:opacity-80"
      >
        {/* Background Floating Logos */}
        <img src={C} alt="C Logo" className="absolute top-[10%] left-[10%] w-[10%] max-w-[80px] rotate-[-20deg] opacity-70" />
        <img src={C2} alt="C2 Logo" className="absolute top-[30%] right-[15%] w-[10%] max-w-[80px] rotate-[20deg] opacity-70" />
        <img src={HTML} alt="HTML Logo" className="absolute top-[15%] right-[5%] w-[12%] max-w-[100px] rotate-[20deg] opacity-70" />
        <img src={Python} alt="Python Logo" className="absolute bottom-[10%] left-[5%] w-[12%] max-w-[100px] rotate-[-40deg] opacity-70" />
        <img src={CSS} alt="CSS Logo" className="absolute bottom-[5%] right-[5%] w-[10%] max-w-[80px] rotate-[-20deg] opacity-70" />
        <img src={Java} alt="Java Logo" className="absolute bottom-[20%] left-[20%] w-[10%] max-w-[80px] rotate-[-20deg] opacity-70" />

      

        {/* Login Form */}
        <div className="relative z-20 flex flex-col justify-center px-6 py-12 w-full max-w-md bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-bold tracking-tight text-white">Log in to your account</h2>

          <form action="#" method="POST" className="mt-6 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium items-start text-white">Email address</label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/20 px-3 py-2 text-gray-200 placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-white hover:underline">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/20 px-3 py-2 text-gray-200 placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center rounded-md bg-gradient-to-r from-[#5318EB] to-[#AB6EF9] px-4 py-2 text-white font-semibold shadow-md hover:opacity-80 transition-all"
              >
                Log in
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm/6 text-white font-semibold">
          
            <Link  to="/Signin">
            Create your account
            </Link>
          </p>
        </div>
      </header>
    </div>
  );
}

export default Login;
