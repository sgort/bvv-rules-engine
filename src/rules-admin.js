import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import RulesListPage from './pages/rules-list-page';
import RulesFormPage from './pages/rules-form-page';
import { RulesContextProvider } from './context/rules-context';

const RulesAdmin = () => {
  return (
    <RulesContextProvider>
      <Container>
        <div className="ui two item menu">
          <NavLink className="item" activeClassName="active" exact to="/">
            Rules List
        </NavLink>
          <NavLink
            className="item"
            activeClassName="active"
            exact
            to="/rules/new"
          >
            Add Rule
        </NavLink>
        </div>
        <Route exact path="/" component={RulesListPage} />
        <Route path="/rules/new" component={RulesFormPage} />
        <Route path="/rules/edit/:_id" component={RulesFormPage} />
      </Container>
    </RulesContextProvider>
  );
};

export default RulesAdmin;