import React from "react";
import "./Heading.css";
const Heading = ({ subtitle, title }) => {
  return (
    <>
      <div id="heading">
        <h3>{subtitle} </h3>
        <h1 style={{ color: "white" }}>{title} </h1>
      </div>
    </>
  );
};

export default Heading;