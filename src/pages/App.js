import React from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "../templates/styleGlobal";
import Routes from "../routes";

import { Context } from "../context";

function App() {
  return (
    <BrowserRouter basename="/ebom2022">
      <GlobalStyle />
      <Context>
        <Routes />
      </Context>
    </BrowserRouter>
  );
}

export default App;
