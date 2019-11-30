const stateChangeCallbacks = {
  idleCallback: state => {
    console.log("state idle");
  },
  contextCallback: state => {
    console.log("state context");
  },
  endCallback: state => {
    console.log("state end");
  },
  questionCallback: state => {
    console.log("state question");
  },
  commentCallback: state => {
    console.log("state comment");
  },
  defaultCallback: state => {
    console.log("default callback");
  }
};

export { stateChangeCallbacks };
