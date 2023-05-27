import React, { useState } from "react";
import "./navbar.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export const Navbar = () => {
  const appUser = useSelector((state) => state.app.user);
  const [user, setUser] = useState(appUser);

  // const [sub, setSub] = useState(false);
  // const [isOpen, setOpen] = useState(false);

  // useEffect(() => {
  //   const getUser = async () => {
  //     if (user) {
  //       const res = await axios.get(
  //         "http://localhost:5000/api/auth/" + user._id
  //       );
  //       console.log(res.data.subscription);
  //       {
  //         user.subscription === true
  //           ? setSub(res.data.subscription)
  //           : setSub(false);
  //       }
  //     }
  //   };
  //   getUser();
  // }, []);

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
          {user === "bibliotekatrenera" ? (
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
          <p>Witaj {user.username} !</p>
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
          {user && user.subscription === true ? (
            <>
              <LockOpenIcon style={{ color: "green" }} />
            </>
          ) : (
            <>
              <LockIcon style={{ color: "crimson" }} />
              <span></span>
            </>
          )}
          {/* <span>0</span> */}
        </div>
      </div>
    </div>
  );
};
