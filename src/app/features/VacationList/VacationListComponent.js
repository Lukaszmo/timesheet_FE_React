import React, { Component } from "react";

import { Header, Grid, Container, Segment } from 'semantic-ui-react';
import TableComponent from '../../common/Table/TableComponent.js';


class VacationListComponent extends Component {

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
            dataField: 'status',
            type: "data"
        },
        {
            id: "3",
            columnName: "Imię i nazwisko",
            className: "width10",
            dataField: 'employeeName',
            type: "data"
        },
        {
            id: "4",
            columnName: "Typ wniosku",
            className: "width10",
            dataField: 'type',
            type: "data",
        },
        {
            id: "5",
            columnName: "Data od",
            className: "width5",
            dataField: 'datefrom',
            type: "data",
        },
        {
            id: "6",
            columnName: "Data do",
            className: "width5",
            dataField: 'dateto',
            type: "data",
        },
        {
            id: "7",
            columnName: "Ilość dni",
            className: "width5",
            dataField: 'quantity',
            type: "data",
        }

    ]


    render() {

        return (
            <Container >
                <Segment color="teal">
                    <Header size='medium'>Lista wniosków</Header>

                    <TableComponent headers={this.headers} />

                </Segment>


            </Container>

        )
    }
}

export default VacationListComponent;