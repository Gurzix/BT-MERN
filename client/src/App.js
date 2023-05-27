import "./App.scss";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Navbar } from "./pages/Navbar/Navbar";
import { Footer } from "./pages/Footer/Footer";
import { Excersises } from "./pages/Excersises/Excersises";
import { SingleEx } from "./pages/SingleEx/SingleEx";
import Login from "./pages/Login/Login";
import { About } from "./pages/About/About";
import Register from "./pages/Register/Register";
import Write from "./pages/Write/Write";
import { useDispatch, useSelector } from "react-redux";
import SubExcersisesPage from "./pages/subExcersisesPage/SubExcersisesPage";
import { useEffect } from "react";
import { getPosts, getCategories } from "./redux/apiCalls";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

function App() {
  const Layout = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.app.user);
    useEffect(() => {
      getPosts(dispatch);
      getCategories(dispatch);
    }, []);

    console.log(user);

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
        { path: "/singleEx/:id", element: <SingleEx /> },
        { path: "/subEx", element: <SubExcersisesPage /> },
        { path: "/about", element: <About /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/write", element: <Write /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
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
