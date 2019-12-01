import React, { useState, useEffect } from "react";
import styles from "./CommentBox.module.scss";

const CommentBox = props => {
  const [comment, setComment] = useState("");

  useEffect(() => {
    props.onCommentChange(comment);
  }, [comment]);

  return (
    <div className={styles["comment-box--wrapper"]}>
      <div className={styles["comment-box--text"]}>Your Comment</div>
      <div className={styles["comment-box--answer-wrapper"]}>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          className={styles["comment-box--answer-input"]}
        />
      </div>
      <div className={styles["comment-box--buttons-wrapper"]}>
        <button onClick={props.onPrevClick}>PREV</button>
        <button onClick={props.onNextClick}>NEXT</button>
      </div>
    </div>
  );
};

CommentBox.defaultProps = {
  gameState: "",
  onAnswerClick: () => console.log("answer clicked"),
  onNextClick: () => console.log("next-clicked"),
  onPrevClick: () => console.log("prev-clicked"),
  question: {
    id: -1,
    description:
      "no question text provided, no question text provided,no question text provided",
    answers: [{ id: 1, text: "text", selected: true }, { id: 2, text: "text2" }]
  }
};

export default CommentBox;
