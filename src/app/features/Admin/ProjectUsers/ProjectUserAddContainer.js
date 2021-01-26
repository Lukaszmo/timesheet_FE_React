import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import ProjectUserAddComponent from './ProjectUserAddComponent';
import { getAllProjects, generateProjectListForDropdown } from '../Projects/Project';
import { addUserToProject, ProjectUsersValidationSchema } from '../ProjectUsers/ProjectUsers';
import { getAllUsersWithFilters, generateUserListForDropdown } from '../Users/User';


class ProjectUserAddContainer extends Component {

    state = {
        userList: null
    }

    componentDidMount() {

        this.props.getAllProjects();
        getAllUsersWithFilters().then(resp => this.setState({ userList: generateUserListForDropdown(resp) }));
    }

    onSubmit = (values) => {

        this.props.addUserToProject(values);
    }

    render() {

        console.log(this.props);

        return (
            <Container className='projects'>
                <ProjectUserAddComponent
                    projectList={generateProjectListForDropdown(this.props.projects)}
                    userList={this.state.userList}
                    onSubmit={this.onSubmit}
                    validationSchema={ProjectUsersValidationSchema}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    data: state.projectUsers.records,
    projects: state.project.records
})

const mapDispatchToProps = dispatch => ({
    addUserToProject: (object) => dispatch(addUserToProject(object)),
    getAllProjects: () => dispatch(getAllProjects())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectUserAddContainer);



