import React from "react";
import { Link } from "react-router-dom";
import "./card.scss";
export const Card = ({ data }) => {
  return (
    <div className="post">
      {data.img && <img src={data.img} className="postImg" alt="" />}

      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">podania strzały</span>
        </div>
        <Link
          className="link"
          to={`/singleEx?id=${data.id}&title=${data.title}`}
        >
          <span className="postTitle">{data.title}</span>
        </Link>

        <hr />
        <span className="postDate">31-03-2023</span>
      </div>
      <p className="postDesc">{data.desc}</p>
    </div>
  );
};
