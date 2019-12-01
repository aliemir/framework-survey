import React from "react";
import styles from './SubmissionBox.module.scss'

const SubmissionBox = props => {
  return (
    <div>
      <p>Selected Contexts: {props.contexts.join(", ")}</p>
      <ul>
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
      <p>Your Comments: {props.comment}</p>
      <div className={styles["submission-box--buttons-wrapper"]}>
        <button onClick={props.onResetClick}>RE-TAKE</button>
      </div>
    </div>
  );
};

export default SubmissionBox;
