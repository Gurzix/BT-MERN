import "./App.scss";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Navbar } from "./pages/Navbar/Navbar";
import { Footer } from "./pages/Footer/Footer";
import { Excersises } from "./pages/Excersises/Excersises";
import { SingleEx } from "./pages/SingleEx/SingleEx";
import { Header } from "./pages/Header/Header";
function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Header />
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
