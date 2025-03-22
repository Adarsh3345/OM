import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import Logo from "../Assets/Logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#5318EB] to-[#AB6EF9] p-3 flex justify-between items-center text-white relative min-h-[60px] md:min-h-[60px] shadow-md">
      {/* Centered Logo */}
      <div className="text-2xl cursor-pointer absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-16 w-16 md:h-12 md:w-12 object-contain" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </button>

      <ul
        className={`absolute top-[75px] left-0 w-full bg-[#AB6EF9] p-4 flex flex-col items-center gap-4 transition-all duration-300 ease-in-out shadow-lg ${
          menuOpen ? "block" : "hidden"
        } md:flex md:flex-row md:static md:bg-transparent md:p-0 md:w-auto md:shadow-none z-20`}
      >
        <li><Link to="/problems" className="cursor-pointer hover:underline ">Problems</Link></li>
        <li><Link to="/contests" className="cursor-pointer hover:underline">Contests</Link></li>
        <li><Link to="/discuss" className="cursor-pointer hover:underline">Discuss</Link></li>
        <li><Link to="/interview" className="cursor-pointer hover:underline">Interview</Link></li>
      </ul>

      {/* Buttons & User Icon */}
      <div className="flex gap-2">
        <Link to="/login" className="border border-white px-4 py-1 rounded-md hover:bg-white hover:text-purple-700 transition hidden md:block">
          Log in
        </Link>
        <Link to="/Signin" className="bg-white text-purple-700 px-4 py-1 rounded-md hover:opacity-80 transition hidden md:block">
          Sign up
        </Link>

        {/* User Icon for Mobile */}
        <button className="md:hidden text-2xl">
          <FaUser />
        </button>
      </div>
    </nav>
  );
}
