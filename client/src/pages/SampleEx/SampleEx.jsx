import React from "react";
import "./sample.scss";
import { Link } from "react-router-dom";
import { Card } from "../Card/Card";
export const SampleEx = () => {
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
  ];

  const newData = data.sort(() => 0.5 - Math.random()).slice(0, 3);
  return (
    <div className="sampleEx">
      <h2>Przykładowe ćwiczenia</h2>
      <div className="sampleExContainer">
        {newData.map((data) => (
          <Card data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
};
