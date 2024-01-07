import React from "react";
import "./App.css";

const Box = (props) => {
  const classes = props.className ? `${props.className} square` : `square`;
  const innerSquareClass = props.className === "inner-square" ? "inner-square" : "";

  return (
    <span
    className={`${classes} ${innerSquareClass} ${props.state === "X" ? "fc-red" : "fc-yellow"}`}
      onClick={() => props.onClick(props.index)}>
      {props.state}
    </span>
  )
}

export default Box;
