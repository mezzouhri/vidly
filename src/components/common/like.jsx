import React from "react";

const Like = props => {
  return (
    <i
      className={props.isLiked ? "fa fa-heart" : "fa fa-heart-o"}
      onClick={props.onClick}
    ></i>
  );
};

export default Like;
