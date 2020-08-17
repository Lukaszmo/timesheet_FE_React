import React, { Component } from "react";

import { Formik } from 'formik';
import { Grid, Segment, Header, Input, Dropdown, Button, Form, TextArea } from 'semantic-ui-react';
import './HoursComponent.css';
import CustomLabel from '../../common/CustomLabel/CustomLabel';

class HoursAddComponent extends Component {

    onSubmit(values) {

        this.props.onSubmit(values);
    }

    dropdownHandleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    //do zrobienia Api
    projectList = [
        { key: 1, text: "Project A", value: "A" },
        { key: 2, text: "Project B", value: "B" },
        { key: 3, text: "Project C", value: "C" }
    ]

    taskList = [
        { key: 1, text: "Task A", value: "A" },
        { key: 2, text: "Task B", value: "B" },
        { key: 3, text: "Task C", value: "C" }
    ]

    render() {

        return (
            <Segment color="teal">
                <Header size='medium'>Rejestracja czasu</Header>
                <Formik
                    initialValues={{ date: '', quantity: '', type: 1, projectCode: '', taskCode: '', comment: '' }}

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
                                                name='projectCode'
                                                className='dropdown-hour-project'
                                                placeholder="Wybierz.."
                                                value={values.projectCode}
                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                options={this.projectList} />
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
                                                name='taskCode'
                                                className='dropdown-hour-task'
                                                placeholder="Wybierz.."
                                                value={values.taskCode}
                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                options={this.taskList} />
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