import React, { Component } from "react";

import { Formik } from 'formik';
import { Header, Grid, Container, Segment, Input, Dropdown, Button, GridRow, Form } from 'semantic-ui-react';
import TableComponent from '../../common/Table/TableComponent.js';

class VacationListComponent extends Component {

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
            columnName: "Nr wniosku",
            className: "width5",
            dataField: 'id',
            type: "data"
        },
        {
            id: "2",
            columnName: "Status",
            className: "width10",
            dataField: 'state',
            subField: 'description',
            type: "data"
        },

        {
            id: "3",
            columnName: "Imię i nazwisko",
            className: "width10",
            dataField: 'employeeFullname',
            type: "data"
        },

        {
            id: "4",
            columnName: "Typ wniosku",
            className: "width10",
            dataField: 'type',
            subField: 'description',
            type: "data",
        },
        {
            id: "5",
            columnName: "Data od",
            className: "width5",
            dataField: 'datefrom',
            type: "data",
            subType: "date",
        },
        {
            id: "6",
            columnName: "Data do",
            className: "width5",
            dataField: 'dateto',
            type: "data",
            subType: "date",
        },
        {
            id: "7",
            columnName: "Ilość dni",
            className: "width5",
            dataField: 'quantity',
            type: "data",
        },
        {
            id: "8",
            columnName: "",
            className: "width5",
            dataField: 'quantity',
            type: "button",
            action: "details",
            iconName: "search"
        }

    ]


    render() {

        return (
            <div>
                <Segment color="teal" className="vacation-list-segment">
                    <Header size='medium'>Lista wniosków</Header>
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
                        rowsPerPage={10}
                        pagination={true} />
                </Segment>
            </div>

        )
    }
}

export default VacationListComponent;