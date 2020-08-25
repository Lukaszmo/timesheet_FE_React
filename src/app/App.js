import React from 'react';
import { Route, Switch } from "react-router-dom";

//import PrivateRoute from "./common/PrivateRoute/PrivateRoute";
import MainContainer from "./common/Main/MainContainer";
import HomeContainer from "./common/Home/HomeContainer";
import LoginContainer from "./features/Login/LoginContainer";
import HoursContainer from './features/Hours/HoursContainer';
import HoursListContainer from './features/HoursList/HoursListContainer';
import HoursDetailsContainer from './features/Hours/HoursDetailsContainer';
import VacationContainer from './features/Vacation/VacationContainer';
import VacationListContainer from './features/VacationList/VacationListContainer';

function App() {
    return (
        <div className="App">

            <Switch>

                <Route exact path='/login' component={LoginContainer} />
                <Route exact path='/' component={LoginContainer} />
                <Route exact path='/home'
                    component={(props) => <MainContainer content={<HomeContainer {...props} />} menuId={"HOME"} submenuId='HOME_SUB1' />} />

                <Route exact path='/czas-pracy-rejestracja'
                    component={(props) => <MainContainer content={<HoursContainer {...props} />} menuId={"TIMESHEET"} submenuId='TIMESHEET_REGISTER' />} />

                <Route exact path='/czas-pracy-lista'
                    component={(props) => <MainContainer content={<HoursListContainer {...props} />} menuId={"TIMESHEET"} submenuId='TIMESHEET_LIST' />} />

                <Route exact path='/czas-pracy-edycja'
                    component={(props) => <MainContainer content={<HoursDetailsContainer {...props} />} menuId={"TIMESHEET"} submenuId='TIMESHEET_LIST' />} />

                <Route exact path='/grafik'
                    component={(props) => <MainContainer content={"GRAFIK IN PROGRESS..."} menuId={"TIMESHEET"} submenuId='WORK_TIME_SCHEDULE' />} />

                <Route exact path='/podsumowanie'
                    component={(props) => <MainContainer content={"PODSUMOWANIE IN PROGRESS..."} menuId={"TIMESHEET"} submenuId='SUMMARY' />} />

                <Route exact path='/urlopy-dodaj-wniosek'
                    component={(props) => <MainContainer content={<VacationContainer {...props} />} menuId={"VACATION"} submenuId='VACATION_ADD' />} />

                <Route exact path='/urlopy-lista-wnioskow'
                    component={(props) => <MainContainer content={<VacationListContainer {...props} />} menuId={"VACATION"} submenuId='REQUEST_LIST' />} />

                <Route exact path='/urlopy-planowanie'
                    component={(props) => <MainContainer content={"PLANOWANIE IN PROGRESS..."} menuId={"VACATION"} submenuId='VACATION_PLAN' />} />

                <Route exact path='/tablica-zadan'
                    component={(props) => <MainContainer content={"TABLICA ZADAŃ IN PROGRESS..."} menuId={"TASK_TABLE"} />} />

                <Route exact path='/raporty'
                    component={(props) => <MainContainer content={"RAPORTY IN PROGRESS..."} menuId={"REPORTS"} />} />

                <Route exact path='/ustawienia-zmiana-hasla'
                    component={(props) => <MainContainer content={"USTAWIENIA IN PROGRESS..."} menuId={"SETTINGS"} submenuId='PASSWORD_CHANGE' />} />

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