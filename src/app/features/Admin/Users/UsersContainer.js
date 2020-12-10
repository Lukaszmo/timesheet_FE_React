import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import UserCreateComponent from './UserCreateComponent';

import { addUser, getAllUsersWithFilters, generateUserListForDropdown, UserValidationSchema } from '../../Admin/Users/User';
import { getAllRoles } from '../Roles/Role';


class UsersContainer extends Component {

    state = {
        userList: null
    }


    componentDidMount() {

        // getAllUsers().then(resp => this.setState({ userList: resp }));
        getAllUsersWithFilters().then(resp => this.setState({ userList: generateUserListForDropdown(resp) }));
        getAllRoles().then(resp => this.setState({ roleList: resp }));

    }

    addUser(values) {

        addUser(values);
    }


    render() {

        console.log(this.props);

        return (
            <Container className='users'>
                <UserCreateComponent
                    roles={this.state.roleList}
                    users={this.state.userList}
                    validationSchema={UserValidationSchema}
                    onSubmit={this.addUser}
                />
            </Container>
        );
    }
}

export default UsersContainer;



