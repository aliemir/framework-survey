import React from "react";
import ReactDOM from "react-dom";
import "sanitize.css";
import { Main } from "./pages";

function App() {
  return <Main />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
