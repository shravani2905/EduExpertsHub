import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RootLayout from "./Components/RootLayout/RootLayout";
import Home from "./Components/Home/Home";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Userdashboard from "./Components/Userdashboard/Userdashboard";
import Explore from "./Components/Explore/Explore";
import "./App.css";
function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "explore",
          element: <Explore />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
    

        {
          path: "login",
          element: <Login />,
        },
        {
          path: "userdashboard",
          element: <Userdashboard />,
        }
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;