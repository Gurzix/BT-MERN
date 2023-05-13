import React, { useEffect } from "react";
import "./List.scss";
import { useSelector } from "react-redux";
import { Card } from "../Card/Card";
import { useState } from "react";

const List = ({ categoryName, categoryFilters, setSearch, search }) => {
  const posts = useSelector((state) => state.app.posts);

  let [filteredProducts, setFilteredProducts] = useState(null);

  // const filteredProducts =
  //   categoryFilters.size === 0
  //     ? posts
  //     : posts.filter((p) => p.subcategories.includes(...categoryFilters));

  // console.log(filteredProducts);

  filteredProducts =
    categoryFilters.size === 0
      ? posts
      : posts.filter((p) => categoryFilters.has(p.subcategories));
  console.log(filteredProducts);
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
