import React from "react";

const Like = ({ isLiked, onClick }) => {
  return (
    <i
      className={isLiked ? "clickable fa fa-heart" : "clickable fa fa-heart-o"}
      onClick={onClick}
    ></i>
  );
};

export default Like;
