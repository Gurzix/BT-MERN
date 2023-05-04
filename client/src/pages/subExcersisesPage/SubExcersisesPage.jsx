import React from "react";
import "./subExcersisesPage.scss";
import { useState } from "react";
import { Card } from "../Card/Card";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const SubExcersisesPage = () => {
  const posts = useSelector((state) => state.app.posts);

  const query = new URLSearchParams(useLocation().search);
  const categoryName = query.get("catName");

  const [maxPrice, setMaxPrice] = useState(30);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  return (
    <div className="subExcersisesPage">
      <h2>{categoryName}</h2>
      <div className="top">
        <div className="inputContainer">
          <input
            className="inputEx"
            id="inputEx"
            type="text"
            placeholder="wyszukaj ćwiczenie"
          />
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <div className="filterItem">
            <h3>Podkategorie</h3>
            {posts?.map((item) => (
              <div className="inputItem" key={item.id}>
                <input
                  type="checkbox"
                  id={item.id}
                  value={item.id}
                  onChange={handleChange}
                />
                <label htmlFor={item.id}>{item.subcategories}</label>
              </div>
            ))}
          </div>
          <div className="filterItem">
            <h3>Ilość zawodników:</h3>
            <div className="inputItem">
              <span>0</span>
              <input
                type="range"
                min={0}
                max={30}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <span>{maxPrice}</span>
            </div>
          </div>
          <div className="filterItem">
            <h3>Sortuj</h3>
            <div className="inputItem">
              <input
                type="radio"
                id="asc"
                value="asc"
                name="price"
                onChange={(e) => setSort("asc")}
              />
              <label htmlFor="asc">Price (Lowest first)</label>
            </div>
            <div className="inputItem">
              <input
                type="radio"
                id="desc"
                value="desc"
                name="price"
                onChange={(e) => setSort("desc")}
              />
              <label htmlFor="desc">Price (Highest first)</label>
            </div>
          </div>
        </div>
        <div className="right">
          {posts
            .filter((p) => p.categories.includes(categoryName.toLowerCase()))
            .map((data) => (
              <Card data={data} key={data._id} />
            ))}
          {/* <List
            catId={catId}
            maxPrice={maxPrice}
            sort={sort}
            subCats={selectedSubCats}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SubExcersisesPage;
