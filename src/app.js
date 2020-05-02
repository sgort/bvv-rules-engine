import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import 'fomantic-ui-css/semantic.min.css';
import './app.css';

import ReadRulesEngine from "./list_rules";
import CheckRules from "./check_rules";
import RulesAdmin from "./rules-admin";

const App = () => (
  <div className='app'>
    <h1>Demo Rules Engine using API's</h1>
    <Navigation />
    <Main />
  </div>
);

const Navigation = () => (
  <nav>
    <ul className="header">
      <li><NavLink exact to="/">Home</NavLink></li>
      <li><NavLink to="/editrules">Edit</NavLink></li>
      <li><NavLink to="/checkrules">Check</NavLink></li>
      <li><NavLink to="/rulesadmin">Admin</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <div className="content">
      <Route exact path="/" component={ReadRulesEngine} />
      <Route path="/checkrules" component={CheckRules} />
      <Route path="/rulesadmin" component={RulesAdmin} />
    </div>
  </Switch>
);

export default App;