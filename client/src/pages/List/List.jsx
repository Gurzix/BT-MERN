import React, { useEffect } from "react";
import "./List.scss";
import { useSelector } from "react-redux";
import { Card } from "../Card/Card";
import { useState } from "react";

const List = ({ categoryName, categoryFilters, newPosts }) => {
  const posts = useSelector((state) => state.app.posts);

  let [filteredProducts, setFilteredProducts] = useState(null);

  // const filteredProducts =
  //   categoryFilters.size === 0
  //     ? posts
  //     : posts.filter((p) => p.subcategories.includes(...categoryFilters));

  // console.log(filteredProducts);

  if (categoryName.toLowerCase() === "taktyka") {
    filteredProducts =
      categoryFilters.size === 0
        ? newPosts
        : newPosts.filter((p) => categoryFilters.has(p.subcategories2));
  } else {
    filteredProducts =
      categoryFilters.size === 0
        ? newPosts
        : newPosts.filter((p) => categoryFilters.has(p.subcategories));
  }

  return (
    <div className="list">
      {filteredProducts
        .filter((post) => post.categories.includes(categoryName.toLowerCase()))
        .map((data) => (
          <Card data={data} key={data._id} />
        ))}
    </div>
  );
};

export default List;
