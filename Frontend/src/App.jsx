import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LeetCodeClone from "./Components/Home";
import Login from "./Components/Login";
import Signin from "./Components/Signin";


const BlankLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-overlay"></div>
        <Outlet /> 
      </main>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      { path: "/", element: <LeetCodeClone /> },
      { path: "/login", element: <Login /> }, 
      { path: "/Signin", element: <Signin /> },  
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
