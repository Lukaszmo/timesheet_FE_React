import React, { Component } from "react";
import { Icon, Table, Pagination, Button, ButtonContent, Confirm } from 'semantic-ui-react';
import './Table.css';
import { routerMiddleware } from "react-router-redux";


/**
 * Params: 
 * - data: array that contains data which will be shown in the table (required)
 * - onTableChange: function which will be fired when table change occurs(cell modification, row removal)
 * - rowsPerPage: number of rows displayed per page  
 * - headers: array of header objects (required)
 * 
 * Header object fields:
 * - id: identifier (required)
 * - columName: column name 
 * - className: css class defined in TableStyle.css ("width10" , "min-width50")
 * - dataField: name of the field in the object in data array from which value will be shown in the table (required for link, label and input types)
 * - type: type of field (link, label, input, button) (required)
 * - action: action that will be fired when given object is clicked. User has acces to row. Example (row) => console.log(row) (required for button and link types)
 * - iconName: name of the icon to be displayed on the button, full list available here https://react.semantic-ui.com/elements/icon/ (required for button)
 * - dropdown: names and values of Dropdown content, full list available here https://react.semantic-ui.com/modules/dropdown/

Usage example

    headers = [
        {
            id: "1",
            columnName: "id",
            className: "width20",
            dataField: 'id',
            type: "data"
        },
        {
            id: "2",
            columnName: "date",
            className: "width20",
            dataField: 'date',
            type: "data"
        },
        {
            id: "3",
            columnName: "type",
            className: "width20",
            dataField: 'type',
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
*/


class TableComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activePage: 1,
            open: false,
            selectedId: null
        }

    }

    onPageChange = (e, data) => {

        this.setState({ activePage: data.activePage })
    }

    handleCancel = () => {

        this.setState({ open: false });
    }

    handleConfirm = () => {

        this.setState({ open: false });
        console.log(this.state);

        // Remove record
    }

    handleButtonClick = (rowAction, rowId) => {

        if (rowAction === "DELETE") { this.setState({ open: true }) };
        if (rowAction === "EDIT") { this.setState({ open: false }) };

        this.setState({ selectedId: rowId });
        this.props.onTableChange(rowAction, rowId);


    }

    render() {

        return (
            <Table celled >
                <Headers headers={this.props.headers}> </Headers>
                <TableBody
                    headers={this.props.headers}
                    data={this.props.data}
                    activePage={this.state.activePage}
                    rowsPerPage={this.props.rowsPerPage}
                    rowAction={this.rowAction}
                    tableState={this.state}
                    handleButtonClick={this.handleButtonClick}
                    handleCancel={this.handleCancel}
                    handleConfirm={this.handleConfirm}
                />
                <Table.Footer>
                    <Table.Row textAlign="center">
                        <Table.HeaderCell colSpan={this.props.headers.length}>
                            {this.props.data ? <Pagination size="small" className="pagina" onPageChange={(e, data) => this.onPageChange(e, data)} defaultActivePage={this.state.activePage} totalPages={Math.ceil(this.props.data.length / this.props.rowsPerPage)} /> : null}
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
const TableBody = ({ headers, data, activePage, rowsPerPage, rowAction, tableState, handleButtonClick, handleCancel, handleConfirm }) => {

    let tableData = data;

    if (tableData === undefined) return null;

    const tableBody = tableData.map(function (row, rowNumber) {

        if ((rowNumber >= (activePage - 1) * rowsPerPage) && (rowNumber <= (activePage * rowsPerPage) - 1)) {

            return <Row
                headers={headers}
                singleRow={row}
                key={rowNumber}
                rowNumber={rowNumber}
                rowAction={rowAction}
                tableState={tableState}
                handleButtonClick={handleButtonClick}
                handleCancel={handleCancel}
                handleConfirm={handleConfirm}
            />
        }
    })

    return (
        <Table.Body>{tableBody}</Table.Body>
    );
};

//Wiersz
const Row = ({ headers, singleRow, rowNumber, rowAction, tableState, handleButtonClick, handleCancel, handleConfirm }) => {
    const row = headers.map(header => {

        //Jeśli header.dataField nie ma wartości ustaw value na null
        const value = header.dataField ? singleRow[header.dataField] : null;
        const action = header.action ? header.action : null;
        const id = header.id + rowNumber;

        return <Cell
            header={header}
            value={value}
            key={id}
            action={action}
            rowAction={rowAction}
            rowObject={singleRow}
            tableState={tableState}
            handleButtonClick={handleButtonClick}
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
        />
    });

    return (
        <Table.Row textAlign="center">{row}</Table.Row>
    );
};

//Komórki
const Cell = ({ header, value, action, rowAction, rowObject, tableState, handleButtonClick, handleCancel, handleConfirm }) => {

    let type = header.type.toUpperCase();
    let actionType = action ? action.toUpperCase() : null;
    let iconName = header.iconName;
    let displayValue = value;

    if (type === 'DATA') {
        return <Table.Cell className={header.className}>{displayValue}</Table.Cell>;
    }

    if (type === 'BUTTON') {

        return <Table.Cell className={header.className}>

            <Button size="small" className="tableButton" title={header.action} onClick={() => handleButtonClick(actionType, rowObject.id)}>
                <ButtonContent>
                    <Icon className="tableIcon" name={iconName} size="large" ></Icon>
                </ButtonContent>
            </Button >

            <Confirm
                header="Usuwanie rekordu"
                content="Czy na pewno chcesz usunąć rekord?"
                open={tableState.open}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </Table.Cell >

    }

};


export default TableComponent;