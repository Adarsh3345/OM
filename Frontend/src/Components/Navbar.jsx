import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser, FaSignOutAlt } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Logo from "../Assets/Logo.png";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitial, setUserInitial] = useState(null); 

  const checkLoginStatus = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserInitial(decoded.sub.name ? decoded.sub.name.charAt(0).toUpperCase() : "U"); 
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    window.location.reload(); 
  };
  
  return (
    <nav className="bg-gradient-to-r from-[#5318EB] to-[#AB6EF9] p-3 flex justify-between items-center text-white relative min-h-[60px] md:min-h-[60px] shadow-md">
      <div className="text-2xl cursor-pointer absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-16 w-16 md:h-12 md:w-12 object-contain" />
        </Link>
      </div>
      <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </button>

      <ul
        className={`absolute top-[75px] left-0 w-full bg-[#AB6EF9] p-4 flex flex-col items-center gap-4 transition-all duration-300 ease-in-out shadow-lg ${menuOpen ? "block" : "hidden"
          } md:flex md:flex-row md:static md:bg-transparent md:p-0 md:w-auto md:shadow-none z-20`}
      >
        <li><Link to="/problem" className="cursor-pointer hover:underline">Problems</Link></li>
        <li><Link to="/contests" className="cursor-pointer hover:underline">Contests</Link></li>
        <li><Link to="/discuss" className="cursor-pointer hover:underline">Discuss</Link></li>
        <li><Link to="/interview" className="cursor-pointer hover:underline">Interview</Link></li>
      </ul>

      <div className="flex gap-2 items-center">
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-purple-700 font-bold text-lg">
              <Link to="/profile">
              {userInitial}
              </Link>
            </div>

            <button
              onClick={handleLogout}
              className="border border-white px-4 py-1 rounded-md hover:bg-white hover:text-purple-700 transition hidden md:block"
            >
              Logout
            </button>

            {/* Logout icon for mobile */}
            <button
              onClick={handleLogout}
              className="md:hidden text-2xl"
            >
              <FaSignOutAlt />
            </button>

          </div>
        ) : (
          <>
            <Link to="/login" className="border border-white px-4 py-1 rounded-md hover:bg-white hover:text-purple-700 transition hidden md:block">
              Log in
            </Link>
            <Link to="/Signin" className="bg-white text-purple-700 px-4 py-1 rounded-md hover:opacity-80 transition hidden md:block">
              Sign up
            </Link>
            <Link to="/login" className="md:hidden text-2xl">
              <FaUser />
            </Link>
          </>
        )}

        {/* FaUser Icon - Always Visible for Mobile */}

      </div>
    </nav>
  );
}
