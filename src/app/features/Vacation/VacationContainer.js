import React, { Component } from 'react';
import { connect } from 'react-redux';

import VacApplComponent from "./VacApplComponent";
import { Container } from 'semantic-ui-react';
import { sendMail, validationSchema } from "./Vacation";


class VacationContainer extends Component {

    onSubmit = (object) => {

        let employeeName = this.props.user.firstname + ' ' + this.props.user.lastname;
        object = { ...object, employeeName: employeeName, managerId: this.props.user.managerid };
        sendMail(object);

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



