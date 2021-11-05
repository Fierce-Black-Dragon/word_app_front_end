import React from "react";

export const Word = (props) => {
  return (
    <div>
      <h2>{props.word}</h2>
      <p>{props.def}</p>
    </div>
  );
};
