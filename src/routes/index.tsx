import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../store"

import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import StudentsPage from '../pages/StudentsPage/StudentsPage';
import StudentPage from "../pages/StudentPage/StudentPage";
import PrivateRoute from "../components/PrivateRoute";
import NavBar from '../components/Navigation/NavBar';

const Routes = () => (
    <Provider store={store}>
        <NavBar />
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/students" component={StudentsPage} />
            <PrivateRoute path="/student/:id/:name" exact component={StudentPage} />
        </Switch>
    </Provider>
);

export default Routes;
