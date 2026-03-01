import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LeetCodeClone from "./Components/Home";
import Login from "./Components/Login";
import Signin from "./Components/Signin";
import Problem from "./Components/Problem";
import Questions from "./Components/Questions";
import Profile from "./Components/Profile";

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
      { path: "/signin", element: <Signin /> },
      { path: "/problem", element: <Problem /> },
      { path: "/questions/:questionName", element: <Questions /> },
      { path: "/questions/:questionName/:roomId", element: <Questions/> },
      { path:"/profile",element:<Profile/>}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
