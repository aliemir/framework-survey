import React from "react";
import styles from "./SubmissionBox.module.scss";

const SubmissionBox = props => {
  return (
    <div className={styles["submisison-box--wrapper"]}>
      <div className={styles["submission-box--text"]}>
        Selected Contexts: <span>{props.contexts.join(", ")}</span>
      </div>
      <ul className={styles["submission-box--list-wrapper"]}>
        {props.questions.map((q, i) => {
          const answerId = props.answers[i].aId;
          const answer = q.answers.find(el => el.id === answerId);
          return (
            <li key={i}>
              {q.description}
              <p>
                <strong>{answer ? answer.text : ""}</strong>
              </p>
            </li>
          );
        })}
      </ul>
      {props.comment.length > 0 && (
        <div className={styles["submission-box--comment-wrapper"]}>
          Your Comments: <p>{props.comment}</p>
        </div>
      )}
      <div className={styles["submission-box--buttons-wrapper"]}>
        <button onClick={props.onResetClick}>RE-TAKE</button>
      </div>
    </div>
  );
};

export default SubmissionBox;
