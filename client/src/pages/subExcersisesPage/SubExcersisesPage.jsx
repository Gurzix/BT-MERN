import React from "react";
import "./subExcersisesPage.scss";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import List from "../List/List";

const SubExcersisesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = useSelector((state) => state.app.categories);
  const posts = useSelector((state) => state.app.posts);
  const query = new URLSearchParams(useLocation().search);
  const categoryName = query.get("catName");

  let [categoryFilters, setcategoryFilters] = useState(new Set());
  const [label, setLabel] = useState("");

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

  function updateFilters(checked, categoryFilter, i) {
    if (checked)
      setcategoryFilters((prev) => new Set(prev).add(categoryFilter));
    if (!checked)
      setcategoryFilters((prev) => {
        const next = new Set(prev);
        next.delete(categoryFilter);
        return next;
      });
  }

  return (
    <div className="subExcersisesPage">
      <h2>{categoryName}</h2>
      <div className="top">
        <div className="inputContainer">
          <input
            onChange={inputChanger}
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
            {categoryName.toLowerCase() === "motoryka" ? null : (
              <h3>Podkategorie</h3>
            )}
            {categories
              .filter((cat) => cat.name.includes(categoryName.toLowerCase()))[0]
              .subCat?.map(({ label, done, id }, i) => (
                <div className="inputItem" key={i}>
                  <input
                    className="example"
                    type="checkbox"
                    id={id}
                    value={label}
                    onChange={(e) => {
                      updateFilters(e.target.checked, label, i);
                      setLabel(e.target.value);
                    }}
                    // onChange={handleChange}
                  />
                  <label htmlFor={id}>{label}</label>
                </div>
              ))}
          </div>
        </div>
        <div className="right">
          <List
            categoryFilters={categoryFilters}
            updateFilters={updateFilters}
            categoryName={categoryName}
            newPosts={newPosts}
          />
        </div>
      </div>
    </div>
  );
};

export default SubExcersisesPage;
