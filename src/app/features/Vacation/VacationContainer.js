import React, { Component } from 'react';
import { connect } from 'react-redux';

import VacApplComponent from "./VacApplComponent";
import { Container } from 'semantic-ui-react';
import { addHolidayRequest, validationSchema } from "./Vacation";


class VacationContainer extends Component {

    onSubmit = (object) => {

        object = { ...object, userid: this.props.user.id, state: 1 }; //state: 1 - nowy wniosek
        addHolidayRequest(object);

    }

    render() {
        console.log(this.props);

        return (
            <Container className="vacation">
                <VacApplComponent user={this.props.user} onSubmit={this.onSubmit} validationSchema={validationSchema}></VacApplComponent>

            </Container>
        );

    }
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(
    mapStateToProps
)(VacationContainer);



