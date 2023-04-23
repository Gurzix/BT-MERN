import React from "react";
import "./singleEx.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
export const SingleEx = () => {
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");
  const title = query.get("title");

  const img1 =
    "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const img2 =
    "https://images.pexels.com/photos/61143/pexels-photo-61143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const [selectedImg, setSelectedImg] = useState(img2);
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
              src="https://images.pexels.com/photos/61143/pexels-photo-61143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="img1"
              onClick={(e) => setSelectedImg(img2)}
            />
            <img
              src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="img2"
              onClick={(e) => setSelectedImg(img1)}
            />
            <p className="singlePostStyling openImg">
              (kliknij obrazek żeby powiększyć)
            </p>
          </div>
          <div className="singlePostFeatures">
            <h2 className="singlePostTitle">
              Prowadzenie piłki jajami i strzał parówką
            </h2>
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
            <p className="descInsideP ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              tempore, saepe est aliquam, vel, sunt id cumque sint ipsa
              reiciendis rerum eaque necessitatibus. Consequatur itaque libero,
              explicabo modi odio eius commodi, autem corrupti nulla et porro
              deserunt architecto delectus impedit recusandae aliquam? Vero
              asperiores, ducimus repellendus obcaecati maiores laborum fuga!
            </p>
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
