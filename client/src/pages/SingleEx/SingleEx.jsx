import React from "react";
import "./singleEx.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const SingleEx = () => {
  // const query = new URLSearchParams(useLocation().search);
  // const id = query.get("id");

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const posts = useSelector((state) => state.app.posts);

  const post = posts.filter((post) => post._id === path);
  console.log(post);
  const [selectedImg, setSelectedImg] = useState(post[0].img);
  const handleImg = (e) => {
    window.open(e.target.src);
  };
  return (
    <div className="singleEx">
      <>
        <div className="singlePost">
          <div className="singlePostImgWrapper">
            <img
              onClick={handleImg}
              className="singlePostImg"
              src={selectedImg}
              alt=""
            />
            <img
              src={post[0].img}
              alt=""
              className="img1"
              onClick={(e) => setSelectedImg(post[0].img)}
            />
            <img
              src={post[0].img2}
              alt=""
              className="img2"
              onClick={(e) => setSelectedImg(post[0].img2)}
            />
            <p className="singlePostStyling openImg">
              (kliknij obrazek żeby powiększyć)
            </p>
          </div>
          <div className="singlePostFeatures">
            <h2 className="singlePostTitle">{post[0].title}</h2>
            <p className="singlePostStyling">
              Część treningu:
              <span className="descInsideP">wstępna </span>{" "}
            </p>
            <p className="singlePostStyling">
              Liczba osób:
              <span className="descInsideP">14</span>
            </p>
            <p className="singlePostStyling">
              Czas trwania: <span className="descInsideP">2 x 5 minut</span>
            </p>
            <p className="singlePostStyling">
              Pole: <span className="descInsideP">40x50</span>
            </p>
            <p className="singlePostDesc singlePostStyling">
              Przebieg ćwiczenia:
            </p>
            <p className="descInsideP ">{post[0].desc}</p>
            <div>
              <p className="singlePostDesc singlePostStyling">
                Coaching Points:
              </p>
              <p className="descInsideP ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur sapiente animi iste sit delectus dolor culpa!
                Tempore vitae, iure unde excepturi autem sed a quam molestias
                mollitia odit reiciendis, ratione asperiores eum fuga
                reprehenderit ad, voluptas inventore aut quaerat repellendus!
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
