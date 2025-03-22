import { useState } from "react";
import C from "../Assets/C.png";
import C2 from "../Assets/C2.png";
import HTML from "../Assets/HTML.png";
import Python from "../Assets/Python.png";
import CSS from "../Assets/CSS.png";
import Java from "../Assets/Java.png";
import logo from "../Assets/logo.png";

export default function LeetCodeClone() {
  return (
    <div className="font-sans">
      <header
        className="relative text-center text-white p-10 md:p-16 flex flex-col items-center justify-center min-h-[90vh] 
        bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#5318EB] before:to-[#AB6EF9] before:opacity-80"
        
      >
        <img
          src={C}
          alt="C Logo"
          className="absolute top-[10%] left-[10%] w-[10%] max-w-[80px] rotate-[-20deg] opacity-70"
        />
        <img
          src={C2}
          alt="C2 Logo"
          className="absolute top-[30%] right-[15%] w-[10%] max-w-[80px] rotate-[20deg] opacity-70"
        />
        <img
          src={HTML}
          alt="HTML Logo"
          className="absolute top-[15%] right-[5%] w-[12%] max-w-[100px] rotate-[20deg] opacity-70"
        />
        <img
          src={Python}
          alt="Python Logo"
          className="absolute bottom-[10%] left-[5%] w-[12%] max-w-[100px] rotate-[-40deg] opacity-70"
        />
        <img
          src={CSS}
          alt="CSS Logo"
          className="absolute bottom-[5%] right-[5%] w-[10%] max-w-[80px] rotate-[-20deg] opacity-70"
        />
        <img
          src={Java}
          alt="Java Logo"
          className="absolute bottom-[20%] left-[20%] w-[10%] max-w-[80px] rotate-[-20deg] opacity-70"
        />

        {/* Centered Main Logo */}
        <img
          src={logo}
          alt="Main Logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
           w-[50%] max-w-[50vw] md:max-w-[40vw] opacity-50"

        />

        {/* Text Content */}
        <h1 className="text-3xl md:text-5xl font-bold relative z-10">
          Don't just code. <span className="text-white">Build.</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-xl relative z-10">
          Unlock Your Coding Potential with Om and become a part of the developer's community.
        </p>
      </header>
    </div>
  );
}
