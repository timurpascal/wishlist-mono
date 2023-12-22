/** библиотеки */
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

/** компоненты */
import Protected from './Protected';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

/** константы */
import { TOKEN } from '../constants/common';

/**
 * Компонент маршрутизации приложения
 */
const Routes = () => {
  const { pathname } = window.location;
  return (
    <Router>
      <Route exact path="/">
        {localStorage.getItem(TOKEN) ? <Redirect to="/user" /> : <Redirect to="/login" />}
      </Route>
      {pathname !== '/login' && pathname !== '/register' && <Protected />}
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Router>
  );
};

export default Routes;
