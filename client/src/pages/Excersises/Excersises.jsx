import React, { useState } from "react";
import "./excersises.scss";
import { useLocation } from "react-router-dom";
import { Card } from "../Card/Card";
import { Link } from "react-router-dom";

export const Excersises = () => {
  const data = [
    {
      id: 1,
      title: "Podania i stanie na rekach",
      img: "https://images.pexels.com/photos/61143/pexels-photo-61143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      categories: "trening motoryka",
    },
    {
      id: 2,
      title: "Podania i stanie na rekach",
      img: "https://images.pexels.com/photos/61143/pexels-photo-61143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      categories: "trening motoryka",
    },
    {
      id: 3,
      title: "Podania i stanie na rekach",
      img: "https://images.pexels.com/photos/61143/pexels-photo-61143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      categories: "trening motoryka",
    },
    {
      id: 4,
      title: "Podania i stanie na rekach",
      img: "https://images.pexels.com/photos/61143/pexels-photo-61143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      categories: ["trening motoryka"],
    },
    {
      id: 5,
      title: "Podania i stanie na rekach",
      img: "https://images.pexels.com/photos/61143/pexels-photo-61143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      categories: "trening motoryka",
    },
    {
      id: 6,
      title: "Podania i stanie na rekach",
      img: "https://images.pexels.com/photos/61143/pexels-photo-61143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      categories: "trening motoryka",
    },
  ];

  const [excersises, setExcersises] = useState(data);
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

  const handleButton = (e) => {
    e.preventDefault();
    console.log(e.target.innerText);
  };
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
          <button onClick={handleButton} key={btn.id}>
            <Link className="link" to="/subEx">
              {btn.title}
            </Link>
          </button>
        ))}
      </div>
      <div className="exContainer">
        {excersises.map((data) => (
          <Card data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
};
