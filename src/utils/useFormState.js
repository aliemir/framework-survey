import { useReducer } from "react";
import states from "./states";
import * as data from "../data/data.json";
import actions from "./actions";
import { setInitialState, setAnswer, populateQuestions } from "./helpers";

const useFormState = () => {
  const [survey, dispatch] = useReducer((curr, action) => {
    switch (action.type) {
      default:
        console.log("UNHANDLED_TYPE, ", action.type);
        break;
      case actions.RESET_FORM:
        return {
          ...setInitialState(data, states.CONTEXT_SELECT)
        };
      case actions.SET_ANSWER:
        if (curr.state === states.CONTEXT_SELECT) {
          return {
            ...curr,
            context: action.payload
          };
        } else if (curr.state === states.QUESTION) {
          return {
            ...curr,
            answers: setAnswer(
              curr.answers,
              curr.currentQuestion,
              action.payload
            )
          };
        } else if (curr.state === states.COMMENT) {
          return {
            ...curr,
            comment: action.payload
          };
        } else {
          console.log("UNEXPECTED BEHAVIOR WHILE SET_ANSWER");
          return { ...curr };
        }
      case actions.NEXT:
        const nextQuestionIndex = curr.currentQuestion + 1;
        if (curr.state === states.CONTEXT_SELECT && curr.context.length > 0) {
          const questions = populateQuestions(curr.context, data);
          return {
            ...curr,
            state: questions.length > 0 ? states.QUESTION : states.COMMENT,
            questions: questions,
            currentQuestion: 0
          };
        } else if (
          curr.state === states.QUESTION &&
          curr.answers[curr.currentQuestion] !== undefined &&
          curr.answers[curr.currentQuestion].aId !== undefined
        ) {
          if (curr.questions[nextQuestionIndex]) {
            return {
              ...curr,
              currentQuestion: nextQuestionIndex
            };
          } else {
            return {
              ...curr,
              state: states.COMMENT
            };
          }
        } else if (curr.state === states.COMMENT) {
          return {
            ...curr,
            state: states.END
          };
        } else {
          return { ...curr };
        }
      case actions.PREV:
        const prevQuestionIndex = curr.currentQuestion - 1;
        if (curr.state === states.CONTEXT_SELECT) {
          return {
            ...curr
          };
        } else if (curr.state === states.QUESTION) {
          if (curr.questions[prevQuestionIndex]) {
            return {
              ...curr,
              currentQuestion: prevQuestionIndex
            };
          } else {
            return {
              ...curr,
              questions: [],
              answers: [],
              state: states.CONTEXT_SELECT
            };
          }
        } else {
          return {
            ...curr
          };
        }
    }
  }, setInitialState(data, states.CONTEXT_SELECT));
  return [survey, dispatch];
};

export default useFormState;
