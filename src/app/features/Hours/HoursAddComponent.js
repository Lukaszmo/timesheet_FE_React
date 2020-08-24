import React, { Component } from "react";

import { Formik } from 'formik';
import { Grid, Segment, Header, Input, Dropdown, Button, Form, TextArea } from 'semantic-ui-react';
import './HoursComponent.css';
import CustomLabel from '../../common/CustomLabel/CustomLabel';

class HoursAddComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            taskDropdownDisabled: 1
        }
    }


    onSubmit(values) {

        this.props.onSubmit(values);
    }

    dropdownHandleChange(e, data, setFieldValue) {

        if (data.name === 'project') {

            this.props.onProjectDropdownChange(data.value);
            this.setState({ taskDropdownDisabled: 0 })
        }

        setFieldValue(data.name, data.value);
    }


    render() {

        return (
            <Segment color="teal">
                <Header size='medium'>Rejestracja czasu</Header>
                <Formik
                    initialValues={{ date: '', quantity: '', type: 1, project: '', task: '', comment: '' }}

                    validationSchema={this.props.validationSchema}

                    onSubmit={(values, { setSubmitting }) => {
                        this.onSubmit(values);
                        setSubmitting(false);
                    }}>

                    {({
                        values,
                        handleSubmit,
                        handleChange,
                        setFieldValue,
                        errors,
                        touched
                    }) => (
                            <Form onSubmit={handleSubmit}>
                                <Grid columns={2} textAlign="right" verticalAlign="middle" >
                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Typ</p>
                                        </Grid.Column >
                                        <Grid.Column width={3}>
                                            <Dropdown fluid selection
                                                name='type'
                                                className='dropdown-hour-types'
                                                placeholder="Wybierz.."
                                                value={values.type}
                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                options={this.props.types} />
                                            {errors.type && touched.type ? <div><CustomLabel text={errors.type}></CustomLabel></div> : null}
                                        </Grid.Column>

                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Projekt</p>
                                        </Grid.Column >
                                        <Grid.Column width={3}>
                                            <Dropdown fluid selection
                                                name='project'
                                                className='dropdown-hour-project'
                                                placeholder="Wybierz.."
                                                value={values.project}
                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                options={this.props.projectList} />
                                        </Grid.Column>

                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Data</p>
                                        </Grid.Column >
                                        <Grid.Column width={3}>
                                            <Input
                                                type='date'
                                                name='date'
                                                value={values.date}
                                                onChange={handleChange} />
                                            {errors.date && touched.date ? <div><CustomLabel text={errors.date}></CustomLabel></div> : null}
                                        </Grid.Column>

                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Zadanie</p>
                                        </Grid.Column >
                                        <Grid.Column width={3}>
                                            <Dropdown fluid selection
                                                disabled={this.state.taskDropdownDisabled}
                                                name='task'
                                                className='dropdown-hour-task'
                                                placeholder="Wybierz.."
                                                value={values.task}
                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                options={this.props.tasks} />
                                        </Grid.Column>

                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Ilość godzin</p>
                                        </Grid.Column >
                                        <Grid.Column width={3}>
                                            <Input
                                                type='number'
                                                name='quantity'
                                                className='hours-quantity'
                                                value={values.quantity}
                                                onChange={handleChange} />
                                            {errors.quantity && touched.quantity ? <div><CustomLabel text={errors.quantity}></CustomLabel></div> : null}
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Komentarz</p>
                                        </Grid.Column >
                                        <Grid.Column width={3}>
                                            <TextArea
                                                name='comment'
                                                className='hours-comment'
                                                value={values.comment}
                                                onChange={handleChange} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                                <Button
                                    type='submit'
                                    className='saveButton'
                                    color='teal'>
                                    {/*onClick={this.props.onButtonClick}>*/}
                                    Dodaj rekord
                                </Button>
                            </Form>
                        )}
                </Formik>
            </Segment >

        )
    }
}

export default HoursAddComponent;