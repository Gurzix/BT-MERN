import "./App.scss";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Navbar } from "./pages/Navbar/Navbar";
import { Footer } from "./pages/Footer/Footer";
import { Excersises } from "./pages/Excersises/Excersises";
import { SingleEx } from "./pages/SingleEx/SingleEx";
import { Login } from "./pages/Login/Login";
import { About } from "./pages/About/About";
import { Register } from "./pages/Register/Register";
import SubExcersisesPage from "./pages/subExcersisesPage/SubExcersisesPage";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/excersises", element: <Excersises /> },
        { path: "/singleEx", element: <SingleEx /> },
        { path: "/subEx", element: <SubExcersisesPage /> },
        { path: "/about", element: <About /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
  ]);
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
