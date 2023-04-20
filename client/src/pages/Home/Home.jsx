import React from "react";
import "./home.scss";
import { SampleEx } from "../SampleEx/SampleEx";
import { Link } from "react-router-dom";

export const Home = () => {
  const user = false;
  return (
    <div className="home">
      <div className="homeContainerForCards">
        <div className="container">
          <div className="card">
            <div className="circle">
              <h2>40+</h2>
            </div>
            <div className="content">
              <p>Ponad setka ćwiczeń, codziennie aktualizowana o kolejne.</p>
              <Link to="/posts">Sprawdź</Link>
            </div>
          </div>
          <div className="card">
            <div className="circle">
              <h2>10</h2>
            </div>
            <div className="content">
              <p>
                Doświadczeni Trenerzy dbający o każdy szczegół oferowanych
                ćwiczeń.
              </p>
              <Link to="/about">Poznaj nas</Link>
            </div>
          </div>
          <div className="card">
            <div className="circle">
              <h2>130</h2>
            </div>
            <div className="content">
              <p>Zweryfikowani użytkownicy korzystający z biblioteki.</p>
              <Link to={user ? "/logoutFirst" : "/register"}>Dołącz</Link>
            </div>
          </div>
        </div>
      </div>
      <SampleEx type={"featured"} />
    </div>
  );
};
