import React, { Component } from "react";

import { Formik } from 'formik';
import { Segment, Header, Button, Dropdown, Grid, Input, Form, GridRow, Label } from 'semantic-ui-react';
import CustomLabel from '../../common/CustomLabel/CustomLabel';
import './HoursComponent.css';


class HoursDetailsComponent extends Component {


    onSubmit(values) {

        const mode = this.props.mode;
        const type = this.props.recordDetails[0].type.id; //typ rekordu który zmieniamy
        let overtacceptance = null;
        let acceptorid = null;
        let msg = null;

        if (mode === 'EDIT') {

            msg = 'Rekord został zmodyfikowany';
            if (values.type === 2) { overtacceptance = 0; }
            if ((type === 2) && (type !== values.type)) {   //jeśli użytkownik zmienia z nadgodzin na inny typ

                overtacceptance = null;
                acceptorid = null;
            }
        }


        if (mode === 'ACCEPTANCE') {

            overtacceptance = (this.props.recordDetails[0].overtacceptance === 0) ? 1 : 0; //akceptacja lub anulowanie
            acceptorid = (overtacceptance === 1) ? this.props.acceptorid : null;
            msg = (overtacceptance === 1) ? 'Nadgodziny zostały zaakceptowane' : 'Akceptacja została anulowana';
        }

        values = { ...values, overtacceptance: overtacceptance, acceptorid: acceptorid };

        const recordId = this.props.recordDetails[0].id

        this.props.onEditFormSubmit(recordId, values, msg);
    }

    dropdownHandleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    render() {
        console.log(this.props);
        const type = this.props.recordDetails[0].type.id;
        const quantity = this.props.recordDetails[0].quantity;
        const date = this.props.recordDetails[0].date.substr(0, 10);  //extract only date from datetime
        const timestamp = this.props.recordDetails[0].timestamp;
        const timestampDate = timestamp.substr(0, 10);
        const timestampTime = timestamp.substr(11, 8);
        const overtAcceptance = this.props.recordDetails[0].overtacceptance;

        let status = null;
        let acceptor = null;
        let buttonClass = 'saveButton'
        let buttonDisabled = this.props.disabled;
        let text = 'Zapisz';

        //Nadgodziny 
        if (type == 2) {

            let labelClass = overtAcceptance === 1 ? 'positive' : 'waiting';
            let msg = overtAcceptance === 1 ? 'Zaakceptowane' : 'Czeka na akceptację';
            let mode = this.props.mode;

            //ustawiamy to co widzi kierownik akceptujący nadgodziny
            if (mode === 'ACCEPTANCE') {

                text = (overtAcceptance === 0) ? 'Zaakceptuj' : 'Anuluj akceptację';
                buttonClass = (overtAcceptance === 0) ? 'saveButton' : 'cancelButton';
                buttonDisabled = false;
            }

            //Ststus nadgodzin
            let label = <Label className={labelClass} id="waiting-left">{msg}</Label>
            status = <Grid.Row>
                <Grid.Column width={2}>
                    Status</Grid.Column >
                <Grid.Column width={2}>
                    {label}
                </Grid.Column>
            </Grid.Row>

            //Zaakceptowane 
            if (overtAcceptance === 1) {

                const acceptorName = this.props.acceptor ? this.props.acceptor.firstname + ' ' + this.props.acceptor.lastname : null;
                const acceptorRegnum = this.props.acceptor ? this.props.acceptor.regnum : null;

                acceptor = <Grid.Row>
                    <Grid.Column width={2}>
                        Akceptujący</Grid.Column >
                    <Grid.Column width={2}>
                        <p className='data-field'> {acceptorName} &nbsp;&nbsp; [ {acceptorRegnum} ] </p>
                    </Grid.Column>
                </Grid.Row>
            }
        }

        let button = <Button disabled={buttonDisabled}
            type='submit'
            //className='saveButton'
            className={buttonClass}>
            {text}
        </Button>


        return (
            <Segment color="teal" >
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
                                            <Dropdown fluid selection disabled={this.props.disabled}
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
                                            <Input disabled={this.props.disabled}
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
                                            <Input disabled={this.props.disabled}
                                                type='number'
                                                name='quantity'
                                                value={values.quantity}
                                                onChange={handleChange} />
                                            {errors.quantity && touched.quantity ? <div><CustomLabel text={errors.quantity}></CustomLabel></div> : null}
                                        </Grid.Column>
                                    </Grid.Row>

                                    {status}
                                    {acceptor}

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Ostatnia modyfikacja</p>
                                        </Grid.Column >
                                        <Grid.Column width={4}>
                                            <p className='data-field'>{timestampDate} &nbsp;&nbsp; [ {timestampTime} ]</p>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                                {button}
                            </Form>
                        )}
                </Formik>
            </Segment>

        )
    }
}

export default HoursDetailsComponent;
