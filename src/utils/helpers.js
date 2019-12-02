const createContextQuestion = (data) => {
  return {
    description: data.survey.contextQuestionText,
    answers: data.survey.contexts.map(c => ({
      id: c.context,
      text: c.displayName,
      context: c.context
    }))
  }
}

const setInitialState = (data, initialState) => {
  return {
    state: initialState,
    currentQuestion: -1,
    context: [],
    contextQuestion: createContextQuestion(data),
    questions: [],
    answers: [],
    comment: ""
  }
}

const setAnswer = (answerArray, answerIndex, answer) => {
  const newArr = [...answerArray];
  newArr[answerIndex] = {aId: answer[0], qId: answerIndex};
  return newArr;
};

const populateQuestions = (contextArray, data) => {
  const qArray = [];
  contextArray.forEach(c => {
    const selectedContext = data.survey.contexts.find(el => el.context === c);
    if (selectedContext) {
      qArray.push(...selectedContext.questions);
    }
  });
  return qArray;
};

export {
  setInitialState,
  setAnswer,
  populateQuestions
}