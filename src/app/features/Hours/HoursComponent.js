import React, { Component } from "react";
import { Icon, Table, Menu, Pagination } from 'semantic-ui-react';
import TableComponent from '../../common/Table/TableComponent.js';
import './HoursComponent.css';


class HoursComponent extends Component {


    render() {
        return (    //TODO tabela jako osobny komponent

            <TableComponent headers={this.props.headers} data={this.props.data} rowsPerPage={5} />
        )
    }
}

export default HoursComponent;