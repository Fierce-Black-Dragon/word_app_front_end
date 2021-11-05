import React from "react";

export const Word = (props) => {
  return (
    <div style={{ borderBottom: "2px solid black" }}>
      <h2>{props.word}</h2>
      <p>{props.def}</p>
    </div>
  );
};
