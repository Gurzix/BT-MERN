import React from "react";
import "./excersises.scss";
import { useLocation } from "react-router-dom";

export const Excersises = () => {
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");
  const title = query.get("title");
  return (
    <div className="excersises">
      {id} + {title}
    </div>
  );
};
