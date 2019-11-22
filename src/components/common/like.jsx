import React from "react";

const Like = props => {
  return (
    <i
      className={props.isLiked ? "fa fa-heart" : "fa fa-heart-o"}
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Like;
