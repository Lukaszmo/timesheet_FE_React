import React, { Component } from "react";

import { Container, Button, GridRow, Segment } from 'semantic-ui-react';
import history from '../../../history';
import './HomeComponent.css';
import '../../../index.css';


class HomeComponent extends Component {

    onTimesheetButtonClick = () => {

        history.push('/czas-pracy-rejestracja');
    }

    onVacationButtonClick = () => {

        history.push('/urlopy-dodaj-wniosek');
    }

    onTaskTableButtonClick() {

        alert("TABLE TASK IN PROGRESS...");
    }

    render() {

        return (

            <Container className="mainPageContainer">

                <Segment color="teal" className="mainPageSegment">
                    <GridRow></GridRow>

                    <GridRow>

                        <Button
                            className="bigBoxButton"
                            onClick={this.onTimesheetButtonClick}>
                            CZAS PRACY
                        </Button>

                        <Button
                            className="bigBoxButton"
                            onClick={this.onVacationButtonClick}>
                            URLOPY
                        </Button>

                        <Button
                            className="bigBoxButton"
                            onClick={this.onTaskTableButtonClick}>
                            <p id="bigButtontext">TABLICA</p>
                        </Button>

                    </GridRow>

                </Segment>

            </Container>
        )
    }
}
// <Content content={this.props.content} /> content przekazywany w App.js*
export default HomeComponent;