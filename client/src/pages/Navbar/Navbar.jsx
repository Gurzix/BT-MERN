import React, { useState } from "react";
import "./navbar.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export const Navbar = () => {
  const appUser = useSelector((state) => state.app.user);
  const [user, setUser] = useState(appUser);
  console.log(user);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.replace("/");
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              Trenerzy
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/excersises">
              Ćwiczenia
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/contact">
              Kontakt
            </Link>
          </li>
          {user === "piotr" ? (
            <li className="topListItem">
              <Link
                className="link"
                to="/write"
                style={{ color: "lime", fontWeight: "400" }}
              >
                Dodaj ćwiczenie
              </Link>
            </li>
          ) : null}

          <li className="topListItem">
            {user && (
              <Link
                className="link"
                to="/login"
                style={{ color: "crimson", marginLeft: "50px" }}
                onClick={handleLogout}
              >
                WYLOGUJ
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <p>Witaj {appUser} !</p>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                <span style={{ color: "green", fontWeight: "500" }}>
                  Zaloguj się
                </span>
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                <span style={{ color: "purple", fontWeight: "500" }}>
                  Zarejestruj się
                </span>
              </Link>
            </li>
          </ul>
        )}
        <div className="topSearchIcon">
          <ShoppingCartIcon className="" />
          <span>0</span>
        </div>
      </div>
    </div>
  );
};
