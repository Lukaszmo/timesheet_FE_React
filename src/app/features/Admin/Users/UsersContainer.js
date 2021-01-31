import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import UserCreateComponent from './UserCreateComponent';

import { addUser, getAllUsers, generateUserListForDropdown, UserValidationSchema } from '../Users/User';
import { getAllRoles } from '../Roles/Role';


class UsersContainer extends Component {

    state = {
        userList: null
    }

    componentDidMount() {

        let filters = { active: true };

        this.props.getAllUsers(filters);
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
                    users={generateUserListForDropdown(this.props.users)}
                    validationSchema={UserValidationSchema}
                    onSubmit={this.addUser}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    users: state.user.records
})

const mapDispatchToProps = dispatch => ({
    getAllUsers: (filters) => dispatch(getAllUsers(filters))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersContainer);



