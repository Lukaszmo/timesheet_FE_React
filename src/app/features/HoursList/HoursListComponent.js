import React, { Component } from "react";

import { Header, Container, Segment } from 'semantic-ui-react';
import TableComponent from '../../common/Table/TableComponent.js';


class HoursListComponent extends Component {

    headers = [
        {
            id: "1",
            columnName: "Data",
            className: "width10",
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
                conditionPositive: "(rowObject.type.id == 2)&&(rowObject.overtacceptance == 1)",
                conditionNegative: "(rowObject.type.id == 2)&&(rowObject.overtacceptance != 1)",
                msgPositive: "Zaakceptowane",
                msgNegative: "Niezaakceptowane"
            }
        },
        {
            id: "3",
            columnName: "Ilość godzin",
            className: "width5",
            dataField: 'quantity',
            type: "data"
        },
        {
            id: "4",
            columnName: "",
            className: "width5",
            dataField: 'name2',
            type: "button",
            action: "edit",
            iconName: "edit outline"
        },
        {
            id: "5",
            columnName: "",
            className: "width5",
            dataField: 'name2',
            type: "button",
            action: "delete",
            iconName: "trash alternate"
        }
    ]


    render() {

        return (
            <Container >
                <Segment color="teal">
                    <Header size='medium'>Lista godzin</Header>

                    <TableComponent headers={this.headers} data={this.props.data} onTableChange={this.props.onTableChange} rowsPerPage={10} />

                </Segment>
            </Container>
        )
    }
}

export default HoursListComponent;