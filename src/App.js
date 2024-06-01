import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RootLayout from "./Components/RootLayout/RootLayout";
import Home from "./Components/Home/Home";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Userdashboard from "./Components/Userdashboard/Userdashboard";
import Explore from "./Components/Explore/Explore";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import Achievements from "./Components/Achievements/Achievements";
import Basic from "./Components/Basic/Basic";
import Certifications from "./Components/Certifications/Certifications"
import Designation from "./Components/Designation/Desgination"
import Fundedprojects from "./Components/Fundedprojects/Fundedprojects";
import Patents from "./Components/Patents/Patents";
import Promotions from "./Components/Promotions/Promotions";
import Publications from "./Components/Publications/Publications";
import Qualification from "./Components/Qualification/Qualification";
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
          path: "signin",
          element: <Login />,
        },
        {
          path: "user-dashboard",
          element: <Userdashboard />,
        },
            {
              path:"/achievements",
              element:<Achievements/>
            },
            {
              path:"/basic",
              element:<Basic/>
            },
            {
              path:"/certifications",
              element:<Certifications/>
            },
            {
              path:"/designation",
              element:<Designation/>
            },
            {
              path:"/funded-projects",
              element:<Fundedprojects/>
            },
            {
              path:"/patents",
              element:<Patents/>
            },
            {
              path:"/promotions",
              element:<Promotions/>
            },
            {
              path:"/publications",
              element:<Publications/>
            },
            {
              path:"/qualification",
              element:<Qualification/>
            },
        {
          path: "admin-dashboard",
          element: <AdminDashboard />,
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