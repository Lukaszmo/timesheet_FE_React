import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import UserDetailsComponent from '../Users/UserDetailsComponent';
import { updateRecord, getAllUsersWithFilters, generateUserListForDropdown } from '../Users/User';
import { getAllRoles } from '../Roles/Role';


class UserDetailsContainer extends Component {

    state = {
        recordDetails: this.props.location.state.recordDetails[0],
    }


    componentDidMount() {

        getAllUsersWithFilters().then(resp => this.setState({ userList: generateUserListForDropdown(resp) }));
        getAllRoles().then(resp => this.setState({ roleList: resp }));

    }

    onSubmit = (values) => {

        updateRecord(values);
    }




    render() {

        console.log(this.props);

        return (
            <Container className='users'>
                <UserDetailsComponent
                    record={this.state.recordDetails}
                    roles={this.state.roleList}
                    users={this.state.userList}
                    onSubmit={this.onSubmit}
                />

            </Container>
        );
    }
}

export default UserDetailsContainer;



