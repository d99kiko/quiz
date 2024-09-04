import React from "react";
import rBlob from "../images/blob1R.png";
import lBlob from "../images/blob1L.png";

export default function Start(props) {
  return (
    <div>
      <img src={rBlob} className="right-image-start" alt="decor" />
      <img src={lBlob} className="left-image-start" alt="decor" />
      <h1 className="title">Quizzical</h1>
      <h3 className="description">
        5 questions with 4 possible answers - only 1 correct
      </h3>
      <button className="button-start" onClick={props.startQuiz}>
        Start quiz
      </button>
    </div>
  );
}
