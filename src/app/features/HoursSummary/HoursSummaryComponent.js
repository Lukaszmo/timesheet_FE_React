import React, { Component } from "react";

import TableComponent from '../../common/Table/TableComponent.js';
import { Header, Container, Segment, Grid, Input, Dropdown, GridRow, Form, Button, GridColumn } from 'semantic-ui-react';
import { Formik } from 'formik';
import { getFirstDayOfMonth, getLastDayOfMonth } from '../../utils/Utils.js';
import './HoursSummaryComponent.css';



class HoursSummaryComponent extends Component {

    constructor(props) {
        super(props);

        const currentDate = new Date();
        const dateFrom = getFirstDayOfMonth(currentDate);
        const dateTo = getLastDayOfMonth(currentDate);

        this.state = {
            dateFrom: dateFrom,
            dateTo: dateTo
        }
    }

    onSubmit(values) {

        const filters = {
            dateFrom: values.datefrom,
            dateTo: values.dateto
        }
        this.props.onFilterSubmit(values.user, filters);

    }

    dropdownHandleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    dateHandleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }


    typeHeaders = [
        {
            id: "1",
            columnName: "Rodzaj",
            className: "width15",
            dataField: 'description',
            type: "data"
        },
        {
            id: "2",
            columnName: "Ilość godzin",
            className: "width10",
            dataField: 'summary',
            type: "data"
        }
    ]

    projectHeaders = [
        {
            id: "1",
            columnName: "Projekt",
            className: "width15",
            dataField: 'description',
            type: "data"
        },
        {
            id: "2",
            columnName: "Ilość godzin",
            className: "width10",
            dataField: 'summary',
            type: "data"
        },
    ]

    taskHeaders = [
        {
            id: "1",
            columnName: "Zadanie",
            className: "width15",
            dataField: 'description',
            type: "data"
        },
        {
            id: "2",
            columnName: "Ilość godzin",
            className: "width5",
            dataField: 'summary',
            type: "data"
        },
    ]

    render() {

        console.log(this.props);

        return (
            <div >
                <Segment color="teal" className="hour-summary-segment">
                    <Header size='medium'>Podsumowanie</Header>
                    <Header className='filter-header'>Filtry</Header>
                    <Formik
                        initialValues={{ user: this.props.loggedUser.id, datefrom: this.state.dateFrom, dateto: this.state.dateTo }}

                        onSubmit={(values, { setSubmitting }) => {
                            this.onSubmit(values);
                            setSubmitting(false);
                        }}>

                        {({
                            values,
                            handleSubmit,
                            handleChange,
                            setFieldValue,
                            errors,
                            touched
                        }) => (
                                <Form onSubmit={handleSubmit}>

                                    <Grid columns={6} textAlign="right" verticalAlign="middle" >

                                        <GridRow>

                                            <Grid.Column width={3}>
                                                <Input
                                                    type='date'
                                                    name='datefrom'
                                                    value={values.datefrom}
                                                    onChange={(e, data) => this.dateHandleChange(e, data, setFieldValue)}

                                                />
                                            </Grid.Column>
                                            <Grid.Column width={3}>
                                                <Input
                                                    type='date'
                                                    name='dateto'
                                                    value={values.dateto}
                                                    onChange={(e, data) => this.dateHandleChange(e, data, setFieldValue)}
                                                />
                                            </Grid.Column>
                                            <Grid.Column width={3}>
                                                <Dropdown fluid selection
                                                    name='user'
                                                    className='dropdown-userlist'
                                                    value={values.user}
                                                    options={this.props.userList}
                                                    onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                ></Dropdown>
                                            </Grid.Column>

                                            <Grid.Column width={2}>
                                                <Button
                                                    type='submit'
                                                    className='filterButton'>Filtruj
                                                </Button>
                                            </Grid.Column>
                                        </GridRow>


                                    </Grid >
                                </Form>
                            )}
                    </Formik>


                </Segment>

                <Segment className='segment-type'>
                    <TableComponent headers={this.typeHeaders} data={this.props.hoursByType}></TableComponent>
                </Segment>

                <Segment className='segment-tasks'>
                    <TableComponent headers={this.taskHeaders} data={this.props.hoursByTask}></TableComponent>
                </Segment>

                <Segment className='segment-projects'>
                    <TableComponent headers={this.projectHeaders} data={this.props.hoursByProject}></TableComponent>
                </Segment>

            </div >
        )
    }
}

export default HoursSummaryComponent;