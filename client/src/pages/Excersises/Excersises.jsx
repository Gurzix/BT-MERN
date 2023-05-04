import React, { useState } from "react";
import "./excersises.scss";
import { useLocation } from "react-router-dom";
import { Card } from "../Card/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export const Excersises = () => {
  const posts = useSelector((state) => state.app.posts);

  const buttons = [
    {
      id: 1,
      title: "rozgrzewka",
    },
    {
      id: 2,
      title: "technika",
    },
    {
      id: 3,
      title: "taktyka",
    },
    {
      id: 4,
      title: "gry",
    },
    {
      id: 5,
      title: "trening ind.",
    },
    {
      id: 6,
      title: "motoryka",
    },
  ];

  return (
    <div className="excersises">
      <h2>BAZA ĆWICZEŃ</h2>
      <div className="inputContainer">
        <input
          className="inputEx"
          id="inputEx"
          type="text"
          placeholder="wyszukaj ćwiczenie"
        />
      </div>

      <div className="searchMainCat">
        {buttons.map((btn) => (
          <div className="button" key={btn.id}>
            <Link
              className="link"
              to={`/subEx?catName=${btn.title.toUpperCase()}`}
            >
              {btn.title}
            </Link>
          </div>
        ))}
      </div>
      <div className="exContainer">
        {posts.map((data) => (
          <Card data={data} key={data._id} />
        ))}
      </div>
    </div>
  );
};
