import React from "react";
import "./singleEx.scss";
import { useLocation } from "react-router-dom";
export const SingleEx = () => {
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");
  const title = query.get("title");
  return (
    <div className="singleEx">
      SingleEx
      {id}
      {title}
    </div>
  );
};
