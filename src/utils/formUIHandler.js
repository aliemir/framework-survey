import actions from "./actions";

function formUIHandler(dispatchFunction) {
  this.dispatch = dispatchFunction;

  this.onResetClick = () => {
    this.dispatch({ type: actions.RESET_FORM });
  };

  this.onAnswerClick = answers => {
    this.dispatch({ type: actions.SET_ANSWER, payload: answers });
  };

  this.onCommentChange = comment => {
    this.dispatch({ type: actions.SET_ANSWER, payload: comment });
  };

  this.onNextClick = () => {
    this.dispatch({ type: actions.NEXT });
  };

  this.onPrevClick = () => {
    this.dispatch({ type: actions.PREV });
  };
}
export default formUIHandler;
