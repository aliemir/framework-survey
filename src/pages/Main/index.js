import React, { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import { QuestionBox, CommentBox, SubmissionBox } from "../../containers";
import { useFormState, states, formUIHandler } from "../../utils";

const Main = props => {
  const [survey, dispatch] = useFormState();
  const formHandler = new formUIHandler(dispatch);

  useEffect(() => {
    formHandler.onResetClick();
  }, []);

  return (
    <div className={styles["main--container"]}>
      {survey.state === states.CONTEXT_SELECT && (
        <QuestionBox
          type="multi"
          question={survey.contextQuestion}
          onNextClick={formHandler.onNextClick}
          onPrevClick={formHandler.onPrevClick}
          onAnswerClick={formHandler.onAnswerClick}
        />
      )}
      {survey.state === states.QUESTION && (
        <QuestionBox
          type="single"
          question={survey.questions[survey.currentQuestion]}
          onNextClick={formHandler.onNextClick}
          onPrevClick={formHandler.onPrevClick}
          onAnswerClick={formHandler.onAnswerClick}
        />
      )}
      {survey.state === states.COMMENT && (
        <CommentBox
          onCommentChange={formHandler.onCommentChange}
          onNextClick={formHandler.onNextClick}
          onPrevClick={formHandler.onPrevClick}
        />
      )}
      {survey.state === states.END && (
        <SubmissionBox
          onResetClick={formHandler.onResetClick}
          questions={survey.questions}
          answers={survey.answers}
          contexts={survey.context}
          comment={survey.comment}
        />
      )}
    </div>
  );
};

export default Main;
