import React from 'react';
import { Route, Switch } from "react-router-dom";

//import PrivateRoute from "./common/PrivateRoute/PrivateRoute";
import MainContainer from "./common/Main/MainContainer";
import HomeContainer from "./common/Home/HomeContainer";
import LoginContainer from "./features/Login/LoginContainer";
import HoursContainer from './features/Hours/HoursContainer';
import VacationContainer from './features/Vacation/VacationContainer';

function App() {
    return (
        <div className="App">

            <Switch>

                <Route exact path='/login' component={LoginContainer} />
                <Route exact path='/' component={LoginContainer} />
                <Route exact path='/home'
                    component={(props) => <MainContainer content={<HomeContainer {...props} />} menuId={"HOME"} />} />

                <Route exact path='/czas-pracy-rejestracja'
                    component={(props) => <MainContainer content={<HoursContainer {...props} />} menuId={"TIMESHEET"} />} />

                <Route exact path='/grafik'
                    component={(props) => <MainContainer content={"GRAFIK IN PROGRESS..."} menuId={"TIMESHEET"} />} />

                <Route exact path='/podsumowanie'
                    component={(props) => <MainContainer content={"PODSUMOWANIE IN PROGRESS..."} menuId={"TIMESHEET"} />} />

                <Route exact path='/urlopy-dodaj-wniosek'
                    component={(props) => <MainContainer content={<VacationContainer {...props} />} menuId={"VACATION"} />} />

                <Route exact path='/urlopy-lista-wnioskow'
                    component={(props) => <MainContainer content={"LISTA WNIOSKÓW IN PROGRESS..."} menuId={"VACATION"} />} />

                <Route exact path='/urlopy-planowanie'
                    component={(props) => <MainContainer content={"PLANOWANIE IN PROGRESS..."} menuId={"VACATION"} />} />

                <Route exact path='/raporty'
                    component={(props) => <MainContainer content={"RAPORTY IN PROGRESS..."} menuId={"REPORTS"} />} />

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