import React, { Component } from "react";

import { Formik } from 'formik';
import { Segment, Header, Button, Dropdown, Grid, Input, Form } from 'semantic-ui-react';
import CustomLabel from '../../common/CustomLabel/CustomLabel';
import './HoursComponent.css';


class HoursDetailsComponent extends Component {

    onSubmit(values) {

        let recordId = this.props.recordDetails[0].id

        this.props.onEditFormSubmit(recordId, values);
    }

    dropdownHandleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }


    render() {
        console.log(this.props.recordDetails);
        let type = this.props.recordDetails[0].type.id;
        let quantity = this.props.recordDetails[0].quantity;
        let date = this.props.recordDetails[0].date.substr(0, 10);  //extract only date from datetime
        let timestamp = this.props.recordDetails[0].timestamp;
        let timestampDate = timestamp.substr(0, 10);
        let timestampTime = timestamp.substr(11, 8);

        return (
            <Segment color="teal">
                <Header size='medium'>Edycja godzin</Header>

                <Formik
                    initialValues={{ date: date, quantity: quantity, type: type }}

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

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Ostatnia modyfikacja</p>
                                        </Grid.Column >
                                        <Grid.Column width={4}>
                                            <p className='data-field'>{timestampDate} &nbsp;&nbsp; [ {timestampTime} ]</p>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                                <Button
                                    type='submit'
                                    className='saveButton'
                                    color='teal'>
                                    Zapisz
                                        </Button>
                            </Form>
                        )}
                </Formik>
            </Segment>

        )
    }
}

export default HoursDetailsComponent;
