import React, { Component } from "react";

import { Formik } from 'formik';
import { Modal, Button, Dropdown, Grid, Input, Form } from 'semantic-ui-react';
import CustomLabel from '../../common/CustomLabel/CustomLabel';
import './HoursComponent.css';


class HoursEditModal extends Component {

    onSubmit(values) {

        let recordId = this.props.recordDetails[0].id

        this.props.onEditFormSubmit(recordId, values);
        this.props.closeModal();
    }

    handleButtonClick = () => {

        this.props.closeModal();
    }

    dropdownHandleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }


    render() {

        let type = this.props.recordDetails[0].type;
        let quantity = this.props.recordDetails[0].quantity;
        let date = this.props.recordDetails[0].date.substr(0, 10);  //extract only date from datetime

        return (

            <Modal className='hour-edit-modal' open={this.props.open}>
                <Modal.Header className='hour-edit'>Edycja czasu pracy</Modal.Header>
                <Modal.Content>
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
                                    </Grid>

                                    <div className='edit-form-buttons-container'>
                                        <Button
                                            type='button'
                                            className='cancelButton'
                                            onClick={this.handleButtonClick}>
                                            Anuluj
                                        </Button>

                                        <Button
                                            type='submit'
                                            className='saveButton'
                                            color='teal'>
                                            Zapisz
                                        </Button>
                                    </div>

                                </Form>
                            )}
                    </Formik>
                </Modal.Content>
            </Modal>

        )
    }
}

export default HoursEditModal;
