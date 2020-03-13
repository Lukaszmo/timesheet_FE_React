import React from 'react';
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./common/PrivateRoute/PrivateRoute";
import MainContainer from "./common/Main/MainContainer";
import HomeContainer from "./common/Home/HomeContainer";
import LoginContainer from "./features/Login/LoginContainer";
import HoursContainer from './features/Hours/HoursContainer';

function App() {
    return (
        <div className="App">

            <Switch>

                <Route exact path='/login' component={LoginContainer} />
                <Route exact path='/' component={LoginContainer} />
                <Route exact path='/home'
                    component={(props) => <MainContainer content={<HomeContainer {...props} />} menuId={"HOME"} />} />

                {/*} do odkomentowania
                <Route exact path='/timesheet/register'
                    component={(props) => <MainContainer content={"REGISTER"} menuId={"TIMESHEET"} />} />
                <Route exact path='/timesheet/work-schedule'
                    component={(props) => <MainContainer content={"WORK-SCHEDULE"} menuId={"TIMESHEET"} />} />
                <Route exact path='/timesheet/summary'
                    component={(props) => <MainContainer content={"SUMMARY"} menuId={"TIMESHEET"} />} />
                */}


                <Route exact path='/czas-pracy'
                    component={(props) => <MainContainer content={<HoursContainer {...props} />} menuId={"TIMESHEET"} />} />

                <Route exact path='/page3'
                    component={(props) => <MainContainer content={"PAGE3"} menuId={"PAGE3"} />} />

                <Route exact path='/home_sub1'
                    component={(props) => <MainContainer content={"HOME_SUB1"} menuId={"HOME"} />} />
                <Route exact path='/home_sub2'
                    component={(props) => <MainContainer content={"HOME_SUB2"} menuId={"HOME"} />} />
                <Route exact path='/home_sub3'
                    component={(props) => <MainContainer content={"HOME_SUB3"} menuId={"HOME"} />} />
                {/* z PrivateRoute nie działa
                <PrivateRoute exact path='/home' />
                component={(props) => <MainContainer {...props} content={"HELLO"} />} /> */}

            </Switch>
        </div>

    );
}

export default App;