import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import List from "./pages/List";
import Home from "./pages/Home";
import NewTask from "./pages/NewTask";
import TaskList from "./pages/TaskList";
import Details from "./pages/Details";
import Error from "./pages/Error";

function App() {
  const [count, setCount] = useState(0);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/Signup",
      element: <Signup />,
    },
    {
      path: "/Home",
      element: <Home />,
    },
    {
      path: "/newTask",
      element: <NewTask />,
    },
    {
      path:'/list',
      element:<TaskList/>
    },
    {
      path:'/task',
      element:<Details/>
    },
    {
      path:'/Error',
      element:<Error/>
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
