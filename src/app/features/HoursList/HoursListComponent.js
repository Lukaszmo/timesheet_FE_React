import React, { Component } from "react";

import { Header, Container, Segment, Grid, Input, Dropdown, GridRow, Form, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import TableComponent from '../../common/Table/TableComponent.js';
import { getFirstDayOfMonth, getLastDayOfMonth } from '../../utils/Utils.js';
import './HoursListComponent.css';


class HoursListComponent extends Component {

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

    headers = [
        {
            id: "1",
            columnName: "Data",
            className: "width5",
            dataField: 'date',
            type: "data",
            subType: "date",
        },
        {
            id: "2",
            columnName: "Rodzaj",
            className: "width15",
            dataField: 'type',
            subField: 'description',
            type: "data",
            label: {
                condition1: "(rowObject.type.id == 2)&&(rowObject.overtacceptance == 0)",
                condition2: "(rowObject.type.id == 2)&&(rowObject.overtacceptance == 1)",
                msg1: "Czeka na akceptację",
                msg2: "Zaakceptowane",
                class1: "waiting",
                class2: "positive"
            }
        },
        {
            id: "3",
            columnName: "Projekt",
            className: "width10",
            dataField: 'project',
            subField: 'description',
            type: "data"
        },
        {
            id: "4",
            columnName: "Zadanie",
            className: "width10",
            dataField: 'task',
            subField: 'description',
            type: "data"
        },
        {
            id: "5",
            columnName: "Ilość godzin",
            className: "width5",
            dataField: 'quantity',
            type: "data"
        },
        {
            id: "6",
            columnName: "",
            className: "width5",
            dataField: 'name2',
            type: "button",
            action: "edit",
            iconName: "edit outline"
        },
        {
            id: "7",
            columnName: "",
            className: "width5",
            dataField: 'name2',
            type: "button",
            action: "delete",
            iconName: "trash alternate"
        }
    ]


    render() {

        console.log(this.props);



        return (
            <div >
                <Segment color="teal" className="hour-list-segment">
                    <Header size='medium'>Lista godzin</Header>
                    <Header className='filter-header'>Filtry</Header>
                    <Formik
                        initialValues={{ user: this.props.loggedUser.id, datefrom: this.props.dateFrom, dateto: this.props.dateTo }}

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

                                    <Grid columns={2} textAlign="right" verticalAlign="middle" >
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
                                                <Dropdown fluid selection disabled={this.props.disabled}
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
                </Segment >
                <Segment>

                    <TableComponent
                        headers={this.headers}
                        data={this.props.data}
                        onTableChange={this.props.onTableChange}
                        rowsPerPage={10}
                        pagination={true} />

                </Segment>
            </div >
        )
    }
}

export default HoursListComponent;