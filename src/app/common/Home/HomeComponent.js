import React, { Component } from "react";

import { Container, Button, GridRow, Icon } from 'semantic-ui-react';
import history from '../../../history';
import './HomeComponent.css';
import '../../../index.css';


class HomeComponent extends Component {

    handleButtonClick = (e, data) => {

        const buttonName = data.name.toUpperCase();

        if (buttonName === 'TIMESHEET') { history.push('/czas-pracy/rejestracja'); }
        if (buttonName === 'VACATION') { history.push('/urlopy/dodaj-wniosek'); }
        if (buttonName === 'TASK_TABLE') { alert("TABLE TASK IN PROGRESS..."); }
        if (buttonName === 'REPORTS') { history.push('/raporty/raport-miesieczny'); }

    }

    render() {

        return (

            <Container className="mainPageContainer">

                <GridRow></GridRow>

                <GridRow>
                    <Button
                        className="bigBoxButton"
                        name="timesheet"
                        onClick={(e, data) => this.handleButtonClick(e, data)}>
                        <Icon name='clock' className='button-icon'></Icon>
                        <p>CZAS PRACY</p>
                    </Button>

                    <Button
                        className="bigBoxButton"
                        name="vacation"
                        onClick={(e, data) => this.handleButtonClick(e, data)}>
                        <Icon name='travel' className='button-icon'></Icon>
                        <p>URLOPY</p>
                    </Button>

                    <Button
                        className="bigBoxButton"
                        name="task_table"
                        onClick={(e, data) => this.handleButtonClick(e, data)}>
                        <Icon name='table' className='button-icon'></Icon>
                        <p>TABLICA</p>
                    </Button>

                    <Button
                        className="bigBoxButton"
                        name='reports'
                        onClick={(e, data) => this.handleButtonClick(e, data)}>
                        <Icon name='chart bar' className='button-icon'></Icon>
                        <p>RAPORTY</p>
                    </Button>

                </GridRow>



            </Container>
        )
    }
}
// <Content content={this.props.content} /> content przekazywany w App.js*
export default HomeComponent;