import React, { Component } from 'react';
import { connect } from 'react-redux';

import HoursComponent from "./HoursComponent";
import HoursAddComponent from "./HoursAddComponent";
import { fetchAllTypes } from "./Hours";
import { Container } from 'semantic-ui-react';


class HoursContainer extends Component {

    componentDidMount() {

        this.props.fetchAllTypes();
    }

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
            action: "delete",
            iconName: "trash alternate"

        }
    ]

    data = [
        { id: 1, email: "email1@email.com", phone: "111111111" },
        { id: 2, email: "email2@email.com", phone: "222222222" },
        { id: 3, email: "email3@email.com", phone: "333333333" },
        { id: 4, email: "email4@email.com", phone: "444444444" },
        { id: 5, email: "email5@email.com", phone: "555555555" },
        { id: 6, email: "email6@email.com", phone: "666666666" }
    ]

    render() {
        //console.log(this.props);
        return (
            <Container className="hours">
                <HoursAddComponent types={this.props.hourTypes} />
                <HoursComponent headers={this.headers} data={this.data} />
            </Container>
        );
    }
}

//pobiera stan ze store i przekazuje do komponentu
const mapStateToProps = state => ({
    hourTypes: state.hour
})

const mapDispatchToProps = dispatch => ({
    fetchAllTypes: () => dispatch(fetchAllTypes())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HoursContainer);
