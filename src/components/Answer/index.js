import React from "react";
import styles from "./Answer.module.scss";

const Answer = ({ id, text, onClick, selected }) => {
  return (
    <div
      className={`${styles["answer--wrapper"]} ${
        selected ? styles.selected : ""
      }`}
    >
      <button type="button" onClick={e => onClick(e)}>
        {text}
      </button>
    </div>
  );
};

Answer.defaultProps = {
  id: -1,
  text: "no answer text provided",
  onClick: e => console.log(e),
  selected: false
};

export default Answer;
