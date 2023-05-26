import React from "react";
import { Link } from "react-router-dom";
import "./card.scss";
export const Card = ({ data }) => {
  return (
    <div className="post">
      {data.img && <img src={data.img} className="postImg" alt="" />}

      <div className="postInfo">
        <div className="postCats">
          {data.categories.map((c) => (
            <Link to={`/subEx?catName=${c.toUpperCase()}`} className="link">
              <span key={c} className="postCat">
                {c}
              </span>
            </Link>
          ))}
        </div>
        <Link
          className="link"
          // to={`/singleEx?id=${data._id}&title=${data.title}`}
          to={`/singleEx/${data._id}`}
        >
          <span className="postTitle">{data.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(data.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="postDesc">{data.desc}</p>
    </div>
  );
};
