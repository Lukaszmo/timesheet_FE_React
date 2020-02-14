import React, { Component } from "react";
import { Icon, Table, Pagination, Button, FormButton, ButtonContent } from 'semantic-ui-react';
import './Table.css';
import { routerMiddleware } from "react-router-redux";


/**
 * Params:
 * - onChange - function which will be fired when table change occurs(cell modification, row addition/removal). 
 *   User has acces to fields such as: modifiedTable, modifiedRow, operationType (UPDATE, ADD, DELETE). (required if one of header types equals 
 *   input or rowsRemoval equals true)
     Example 
           (modifiedTable, modifiedRow, operationType) => {
                console.log(modifiedTable);
                console.log(modifiedRow);
                console.log(operationType);
                this.setState({
                    data: modifiedTable
                })
            }
 * - data = array that contains data which will be shown in the table (required)
 * - headers = array of header objects (required)
 * - rowsRemoval - boolean, if set to true there will be shown button to delete row (default = false)
 * 
 * Header object fields:
 * - id - identifier (required)
 * - columName - column name 
 * - dataField - name of the field in the object in data array from which value will be shown in the table (required for link, label and input types)
 * - type - type of filed (link, lable, input, button) (required)
 * - action - action that will be fired when given object is clicked. User has acces to row. Example (row) => console.log(row) (required for button and link types)
 * - name - Name of the element (required for button type) 
 * - iconName - name of the icon to be displayed on the button, full list available here https://react.semantic-ui.com/elements/icon/ (required for button)
 * - buttonColor - name of the color that displayed button should have, full list available here https://react.semantic-ui.com/elements/button/ (required for button)
 * - disabled - determines whether the cell should be not editable {true- not editable, no exsist or false - cell editable}
 * - dropdown - names and values of Dropdown content, full list available here https://react.semantic-ui.com/modules/dropdown/
 * - className - css class defined in TableStyle.css ("width10" , "min-width50")
 * - checkAll = object for checkbox type field. Makes it possible to select all checkboxes.
 * - textAlign - left/center/right, default is center.
 * 
 * - isActionDisabled - function to determine if button/component should be disabled or not
 * If one of headers type equals input below table will be shown button which gives possibility to add new rows to the table.
 *  
 *

Usage example

headers = [
        {
            id: "1",
            columnName: "email",
            className: "width20",
            dataField: 'email',
            type: "data"
        },
        {
            id: "2",
            columnName: "phone number",
            className: "width20",
            dataField: 'phone',
            type: "data"
        },
        {
            id: "3",
            columnName: "",
            className: "width20",
            dataField: 'name2',
            type: "button",
            iconName: "folder"
        }
    ]
*/


class TableComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activePage: 1
        }

    }

    onPageChange = (e, data) => {

        this.setState({ activePage: data.activePage })
    }

    rowAction = (rowAction, rowObject) => {

        let action = rowAction.toUpperCase();

        if (action === 'DELETE') {

            console.log(rowObject);
            //modal confirm i akcja do API usuniecie rekord
        }

        if (action === 'UPDATE') {


        }


    }

    render() {

        return (

            <Table celled >
                <Headers headers={this.props.headers}> </Headers>
                <TableBody headers={this.props.headers} data={this.props.data} activePage={this.state.activePage} rowsPerPage={this.props.rowsPerPage} rowAction={this.rowAction}></TableBody>
                <Table.Footer>
                    <Table.Row textAlign="center">
                        <Table.HeaderCell colSpan='4'>
                            <Pagination size="small" className="pagina" onPageChange={(e, data) => this.onPageChange(e, data)} defaultActivePage={this.state.activePage} totalPages={Math.ceil(this.props.data.length / this.props.rowsPerPage)} />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}

//Nagłówki tabeli
const Headers = ({ headers }) => {
    const header = headers.map((header, index) => (<Table.HeaderCell key={header.id}>{header.columnName}</Table.HeaderCell>));
    return (
        <Table.Header>
            <Table.Row textAlign="center">{header}</Table.Row>
        </Table.Header>
    );
};

//Body tabeli
const TableBody = ({ headers, data, activePage, rowsPerPage, rowAction }) => {

    let tableData = data;

    const tableBody = tableData.map(function (row, rowNumber) {

        if ((rowNumber >= (activePage - 1) * rowsPerPage) && (rowNumber <= (activePage * rowsPerPage) - 1)) {

            return <Row headers={headers} singleRow={row} key={rowNumber} rowNumber={rowNumber} rowAction={rowAction} ></Row>
        }
    })

    return (
        <Table.Body>{tableBody}</Table.Body>
    );
};

//Wiersz
const Row = ({ headers, singleRow, rowNumber, rowAction }) => {
    const row = headers.map(header => {

        //Jeśli header.dataField nie ma wartości ustaw value na null
        const value = header.dataField ? singleRow[header.dataField] : null;
        const action = header.action ? header.action : null;
        const id = header.id + rowNumber;

        return <Cell header={header} value={value} key={id} action={action} rowAction={rowAction} rowObject={singleRow}></Cell>
    });

    return (
        <Table.Row textAlign="center">{row}</Table.Row>
    );
};

//Komórki
const Cell = ({ header, value, action, rowAction, rowObject }) => {

    let type = header.type.toUpperCase();
    let iconName = header.iconName;
    let displayValue = value;

    console.log(action);

    if (type === 'DATA') {
        return <Table.Cell >{displayValue}</Table.Cell>;
    }

    if (type === 'BUTTON') {
        return <Table.Cell >
            <Button size="small" className="tableButton" onClick={() => rowAction(action, rowObject)}>
                <ButtonContent>
                    <Icon className="tableIcon" name={iconName} size="large" ></Icon>
                </ButtonContent>
            </Button>
        </Table.Cell>
    }

};


export default TableComponent;