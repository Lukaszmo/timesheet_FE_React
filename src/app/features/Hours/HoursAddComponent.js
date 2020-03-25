import React, { Component } from "react";

import { Formik } from 'formik';
import { Grid, Segment, Header, Input, Dropdown, Button, Form, Label } from 'semantic-ui-react';
import './HoursComponent.css';
import CustomLabel from '../../common/CustomLabel/CustomLabel';

class HoursAddComponent extends Component {

    onSubmit(values) {

        this.props.onSubmit(values);
    }

    dropdownHandleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    render() {

        return (
            <Segment color="teal">
                <Header size='medium'>Rejestracja czasu</Header>
                <Formik
                    initialValues={{ date: '', quantity: '', type: '' }}

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
                                            Typ
                                        </Grid.Column >
                                        <Grid.Column width={2}>
                                            <Dropdown fluid selection
                                                name='type'
                                                className='dropdown-hour-types'
                                                placeholder="Wybierz.."
                                                value={values.type}
                                                onChange={(e, data) => this.dropdownHandleChange(e, data, setFieldValue)}
                                                options={this.props.types} />
                                            {errors.type && touched.type ? <div><CustomLabel text={errors.type}></CustomLabel></div> : null}
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            Data
                                        </Grid.Column >
                                        <Grid.Column width={2}>
                                            <Input
                                                type='date'
                                                name='date'
                                                value={values.date}
                                                onChange={handleChange} />
                                            {errors.date && touched.date ? <div><CustomLabel text={errors.date}></CustomLabel></div> : null}
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            Ilość godzin
                                        </Grid.Column >
                                        <Grid.Column width={2}>
                                            <Input
                                                type='number'
                                                name='quantity'
                                                value={values.quantity}
                                                onChange={handleChange} />
                                            {errors.quantity && touched.quantity ? <div><CustomLabel text={errors.quantity}></CustomLabel></div> : null}
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                                <Button
                                    type='submit'
                                    className='addButton'
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