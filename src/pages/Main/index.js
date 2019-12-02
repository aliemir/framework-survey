import React, { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import { QuestionBox, CommentBox, SubmissionBox } from "../../containers";
import { useFormState, states, actions } from "../../utils";

// Burada context kullanip form logicini pageden ayirmak
// daha akillica olurdu ama simdilik zaman harcamamak icin bu sekilde
// kullaniyorum.

// Aslinda buradaki tum fonksiyonlarida tekrar bir connection katmani olusturup kullanmak daha mantikli olurdu.
// Sonunda da ortaya cikan custom hook ve connector tekrar kullanilabilir olmaya cok yakin olurdu. cookkkk.

const Main = props => {
  const [survey, dispatch] = useFormState();

  useEffect(() => {
    dispatch({ type: actions.RESET_FORM });
  }, []);

  // useEffect(() => {
  //   console.log(survey);
  // }, [survey]);

  const onResetClick = answers => {
    dispatch({ type: actions.RESET_FORM });
  };

  const onAnswerClick = answers => {
    dispatch({ type: actions.SET_ANSWER, payload: answers });
  };

  const onCommentChange = comment => {
    dispatch({ type: actions.SET_ANSWER, payload: comment });
  };

  const onNextClick = () => {
    dispatch({ type: actions.NEXT });
  };

  const onPrevClick = () => {
    dispatch({ type: actions.PREV });
  };

  return (
    <div className={styles["main--container"]}>
      {survey.state === states.CONTEXT_SELECT && (
        <QuestionBox
          type="multi"
          question={survey.contextQuestion}
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
          onAnswerClick={onAnswerClick}
        />
      )}
      {survey.state === states.QUESTION && (
        <QuestionBox
          type="single"
          question={survey.questions[survey.currentQuestion]}
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
          onAnswerClick={onAnswerClick}
        />
      )}
      {survey.state === states.COMMENT && (
        <CommentBox
          onCommentChange={onCommentChange}
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
        />
      )}
      {survey.state === states.END && (
        <SubmissionBox
          onResetClick={onResetClick}
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
