import { useReducer } from "react";
import states from "./states";
import * as data from "../data/data.json";
import actions from "./actions";
// import { stateChangeCallbacks } from "./callbacks";

// const {
//   idleCallback,
//   contextCallback,
//   endCallback,
//   questionCallback,
//   commentCallback,
//   defaultCallback
// } = stateChangeCallbacks;


const surveyDataFromJSON = data.survey.contexts;
console.log(surveyDataFromJSON)

const initialState = {
  state: states.CONTEXT_SELECT,
  currentQuestion: -1,
  context: [],
  contextQuestion: {
    description: data.survey.contextQuestionText,
    answers: surveyDataFromJSON.map(c => ({
      id: c.context,
      text: c.displayName,
      context: c.context
    }))
  },
  questions: [
    {
      id: -1,
      text: ""
    }
  ],
  answers: [],
  comment: ""
};

const useFormState = () => {
  // const [formState, setFormState] = useState(states.IDLE);
  //const [state, setState] = useState({});
  // useEffect(() => {
  //   switch (formState) {
  //     case states.IDLE:
  //       idleCallback();
  //       break;
  //     case states.CONTEXT_SELECT:
  //       contextCallback();
  //       break;
  //     case states.END:
  //       endCallback();
  //       break;
  //     case states.QUESTION:
  //       questionCallback();
  //       break;
  //     case states.COMMENT:
  //       commentCallback();
  //       break;
  //     default:
  //       defaultCallback();
  //       break;
  //   }
  // }, [formState]);

  const setAnswer = (answerArray, answerIndex, answer) => {
    const newArr = [...answerArray];
    newArr[answerIndex] = {aId: answer[0], qId: answerIndex};
    return newArr;
  };

  const populateQuestions = (contextArray, surveyData) => {
    const qArray = [];
    console.log(surveyData )
    contextArray.forEach(c => {
      const selectedContext = surveyData.find(el => el.context === c);
      if (selectedContext) {
        qArray.push(...selectedContext.questions);
      }
    });
    return qArray;
  };

  const [survey, dispatch] = useReducer((curr, action) => {
    switch (action.type) {
      default:
        console.log("UNHANDLED_TYPE, ", action.type);
        break;
      case actions.RESET_FORM:
        //setFormState(states.CONTEXT_SELECT);
        return {
          ...initialState
        };
      case actions.SET_ANSWER:
        console.log(action);
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
          //setFormState(states.QUESTION);
          return {
            ...curr,
            state: states.QUESTION,
            questions: populateQuestions(curr.context, surveyDataFromJSON),
            currentQuestion: nextQuestionIndex
          };
        } else if (
          curr.state === states.QUESTION &&
          curr.answers[curr.currentQuestion] !== undefined
        ) {
          if (curr.questions[nextQuestionIndex]) {
            return {
              ...curr,
              currentQuestion: nextQuestionIndex
            };
          } else {
            //setFormState(states.COMMENT);
            return {
              ...curr,
              state: states.COMMENT
            };
          }
        } else if (curr.state === states.COMMENT) {
          //setFormState(states.END);
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
            //setFormState(states.CONTEXT_SELECT);
            return {
              ...curr,
              state: states.CONTEXT_SELECT
            };
          }
        } else {
          return {
            ...curr
          };
        }
    }
  }, initialState);
  return [survey, dispatch];
};

export default useFormState;
