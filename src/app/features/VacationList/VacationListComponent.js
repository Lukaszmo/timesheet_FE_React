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
            <Container >
                <Segment color="teal">
                    <Header size='medium'>Lista wniosków</Header>

                    <TableComponent headers={this.headers} data={this.props.data} rowsPerPage={15} />

                </Segment>


            </Container>

        )
    }
}

export default VacationListComponent;