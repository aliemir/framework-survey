import React from "react";
import ReactDOM from "react-dom";
import "sanitize.css";
import styles from "./index.module.scss";
import { Main } from "./pages";

function App() {
  return <Main />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
