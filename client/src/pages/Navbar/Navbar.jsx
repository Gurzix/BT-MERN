import React, { useState } from "react";
import "./navbar.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [user, setUser] = useState(false);
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
              O nas
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
          <li className="topListItem">
            {user && <span style={{ color: "crimson" }}>WYLOGUJ</span>}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <p>Witaj user!</p>
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
