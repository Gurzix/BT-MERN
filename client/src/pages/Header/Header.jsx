import React from "react";
import "./header.scss";
import img from "./header.webp";
export const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Biblioteka</span>
        <span className="headerTitleLg">Trenera</span>
      </div>
      <p>Setki ćwiczeń. Niewyczerpane źródło inspiracji.</p>
      <img className="headerImg" src={img} alt="" />
    </div>
  );
};
