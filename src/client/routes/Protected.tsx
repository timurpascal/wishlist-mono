/** библиотеки */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

/** компоненты */
import Header from '../components/Header/Header';
import User from '../pages/User/User';
import GiftPage from '../pages/GiftPage/GiftPage';
import Friends from '../pages/Friends/Friends';
import Settings from '../pages/Settings/Settings';

/**
 * Маршруты доступные авторизованному пользователю
 */
const Protected = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/user/:id">
          <User />
        </Route>
        <Route path="/gift/:id">
          <GiftPage />
        </Route>
        <Route path="/friends">
          <Friends />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
    </>
  );
};

export default Protected;
