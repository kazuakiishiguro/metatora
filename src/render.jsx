import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Main from "./Main.jsx";

ReactDOM.render(
  <MuiThemeProvider>
    <Main />
  </MuiThemeProvider>,
  document.getElementById("app")
);