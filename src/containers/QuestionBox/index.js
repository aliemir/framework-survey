import React, { useState, useEffect } from "react";
import styles from "./QuestionBox.module.scss";
import { Answer } from "../../components";

const QuestionBox = props => {
  const [selectedAnswers,setSelectedAnswers] = useState([])
  
  useEffect(() => {
    props.onAnswerClick(selectedAnswers)
  }, [selectedAnswers])

  const answerClickHandler = (id) => {
    if(props.type === 'multi'){
      if(selectedAnswers.includes(id)) {
        setSelectedAnswers(selectedAnswers.filter(el => el !== id))
      } else {
        setSelectedAnswers([...selectedAnswers, id])
      }
    } else {
      setSelectedAnswers([id])
    }
  }
  

  return (
    <div className={styles["question-box--wrapper"]}>
      <div className={styles["question-box--text"]}>
        {props.question.description}
      </div>
      <div className={styles["question-box--answer-wrapper"]}>
        {props.question.answers.map((a, i) => (
          <Answer
            key={i}
            id={a.id}
            text={a.text}
            selected={selectedAnswers.includes(a.id)}
            onClick={() => answerClickHandler(a.id)}
          />
        ))}
      </div>
      <div className={styles["question-box--buttons-wrapper"]}>
        <button onClick={props.onPrevClick}>PREV</button>
        <button onClick={props.onNextClick}>NEXT</button>
      </div>
    </div>
  );
};

QuestionBox.defaultProps = {
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

export default QuestionBox;
