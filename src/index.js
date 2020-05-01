import React from "react";
import ReactDOM from "react-dom";
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import 'fomantic-ui-css/semantic.min.css';

// temp for testing purposes
import RulesAdmin from './rules-admin';


ReactDOM.render((
  <BrowserRouter>
    <RulesAdmin />
  </BrowserRouter>
), document.getElementById('root')
);