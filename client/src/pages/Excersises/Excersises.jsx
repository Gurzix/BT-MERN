import React, { useState } from "react";
import "./excersises.scss";
import { useLocation } from "react-router-dom";
import { Card } from "../Card/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export const Excersises = () => {
  const posts = useSelector((state) => state.app.posts);
  const categories = useSelector((state) => state.app.categories);
  const user = useSearchParams((state) => state.app.user);
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

  const [newPosts, setNewPosts] = useState(posts);

  const inputChanger = (e) => {
    e.preventDefault();

    const words = e.target.value
      .split(" ")
      .filter((word) => word.trim() !== "");
    const res = newPosts.filter((post) => {
      for (let i = 0; i < words.length; i++) {
        if (post.title.toLowerCase().includes(words[i].toLowerCase())) {
          return true;
        }
      }
      return false;
    });

    setNewPosts(res);

    if (e.target.value === "") {
      setNewPosts(posts);
    }
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
          onChange={inputChanger}
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
        {newPosts.map((data) => (
          <Card data={data} key={data._id} />
        ))}
      </div>
    </div>
  );
};
