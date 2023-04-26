import React from "react";
import "./sample.scss";
import { Link } from "react-router-dom";
import { Card } from "../Card/Card";
import { useSelector } from "react-redux";
export const SampleEx = () => {
  const posts = useSelector((state) => state.app.posts);

  // const newData = posts.sort(() => 0.5 - Math.random()).slice(0, 4);
  // console.log(newData);
  return (
    <div className="sampleEx">
      <h2>Przykładowe ćwiczenia</h2>
      <div className="sampleExContainer">
        {posts.slice(0, 4).map((data) => (
          <Card data={data} key={data._id} />
        ))}
      </div>
    </div>
  );
};
