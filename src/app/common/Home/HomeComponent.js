import React, { Component } from "react";

import { Header, Grid, Container, Button, GridRow, Segment, Icon } from 'semantic-ui-react';
import history from '../../../history';
import './HomeComponent.css';
import '../../../index.css';

import { connect } from 'react-redux';
import { setActiveMenuItemId } from "../Menu/Menu";


class HomeComponent extends Component {

    onTimesheetButtonClick = () => {

        this.props.setActiveMenuItemId('TIMESHEET');
        history.push('/czas-pracy-rejestracja');
    }

    onVacationButtonClick = () => {

        this.props.setActiveMenuItemId('VACATION');
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
                            TABLICA ZADAŃ
                        </Button>

                    </GridRow>

                </Segment>

            </Container>
        )
    }
}
// <Content content={this.props.content} /> content przekazywany w App.js*
//export default HomeComponent;

const mapStateToProps = state => ({
    menu: state.menu
})

const mapDispatchToProps = dispatch => ({
    setActiveMenuItemId: (id) => dispatch(setActiveMenuItemId(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeComponent);