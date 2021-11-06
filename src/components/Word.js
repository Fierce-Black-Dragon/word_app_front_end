import React from "react";

export const Word = (props) => {
  // word item
  return (
    <div style={{ borderBottom: "1px solid black" }}>
      <h2>{props.word}</h2>
      <p>{props.def}</p>
    </div>
  );
};
