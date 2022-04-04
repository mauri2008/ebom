import React, {useContext, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from '../templates/styleGlobal';
import Routes from '../routes';

import { Context, StateContext } from '../context'


function App() {

 
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Context>
        <Routes/>
      </Context>
    </BrowserRouter>
  );
}

export default App;
