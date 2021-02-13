import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import TaskCreateComponent from './TaskCreateComponent';
import { createTask, TaskValidationSchema } from './Tasks';

class TasksContainer extends Component {

    componentDidMount() {

        // this.props.getAllTasks();
    }

    addTask = (values) => {

        this.props.createTask(values);
    }

    render() {

        return (
            <Container className='tasks'>
                <TaskCreateComponent
                    validationSchema={TaskValidationSchema}
                    onSubmit={this.addTask}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    createTask: (object) => dispatch(createTask(object))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TasksContainer);



