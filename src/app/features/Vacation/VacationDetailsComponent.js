import React, { Component } from "react";

import { Formik } from 'formik';
import { Segment, Header, Button, Dropdown, Grid, Input, Form, GridRow, Label, TextArea, Divider } from 'semantic-ui-react';



class VacationDetailsComponent extends Component {

    getLeftButtonText(mode, requestState) {

        let val = 'Anuluj wniosek';

        if ((requestState == 4) && (mode !== 'ACCEPTANCE')) { val = 'Wyślij prośbę o anulowanie wniosku' }

        if (mode === 'ACCEPTANCE') {
            val = 'Odrzuć';
            if (requestState == 4) val = 'Anuluj akceptację';

        }

        return val;
    }

    rightButtonOnClick = () => {

        const newState = 4;    // Zaakceptowany
        const msg = 'Wniosek urlopowy został zaakceptowany';

        this.props.changeStatus(this.props.recordDetails.id, newState, msg);
    }

    leftButtonOnClick = () => {

        const oldState = this.props.recordDetails.state.state;
        const mode = this.props.mode;
        let msg = 'Wniosek urlopowy został anulowany';
        let newState;

        //Akcje podwaładnego
        if ((oldState == 1) || (oldState == 2)) { newState = 7; }   // Anulowanie wniosku
        if (oldState == 4) { newState = 6; }   // Prośba o anulowanie zaakceptowanego wniosku

        //Akcje przełożonego
        if (mode === 'ACCEPTANCE') {

            if (oldState == 4) { newState = 2, msg = 'Akceptacja wniosku urlopowego została anulowana'; }
            if (oldState == 2) { newState = 5, msg = 'Wniosek urlopowy został odrzucony'; }
        }

        this.props.changeStatus(this.props.recordDetails.id, newState, msg);
    }


    render() {

        console.log(this.props);

        const employeeName = this.props.recordDetails.user.firstname + ' ' + this.props.recordDetails.user.lastname;
        const datefrom = this.props.recordDetails.datefrom.substr(0, 10);
        const dateto = this.props.recordDetails.dateto.substr(0, 10);
        const text = this.props.recordDetails.state.description;
        const requestState = this.props.recordDetails.state.state;
        const timestamp = this.props.recordDetails.timestamp;
        const timestampDate = timestamp.substr(0, 10);
        const timestampTime = timestamp.substr(11, 8);
        const mode = this.props.mode;
        const labelClass = this.props.labelClass;
        const leftButtonClass = this.props.leftButtonClass;
        let leftButtonText = this.getLeftButtonText(mode, requestState);

        let label = <Label className={labelClass} id="label-left">{text}</Label>

        let leftButton = <Button
            type='submit'
            className={leftButtonClass}
            onClick={this.leftButtonOnClick}>
            {leftButtonText}
        </Button>

        //nie pokazuj przycisku anulowania gdy wniosek został już anulowany lub odrzucony
        leftButton = ((requestState == 5) || (requestState == 7)) || ((mode === 'ACCEPTANCE') && (requestState == 3)) ? null : leftButton;

        let rightButton = <Button
            type='submit'
            className='saveButton'
            onClick={this.rightButtonOnClick}>
            Zaakceptuj
             </Button>

        //przycisk akceptacji wyświetlaj tylko dla statusu Czeka na akceptację w trybie akceptacji
        rightButton = (mode === 'ACCEPTANCE') && (requestState == 2) ? rightButton : null;

        let acceptorRow = <Grid.Row>
            <Grid.Column width={3}>
                Akceptujący</Grid.Column >
            <Grid.Column width={2}>
                <p className='data-field'>  </p>
            </Grid.Column>
        </Grid.Row>

        acceptorRow = (requestState == 4) ? acceptorRow : null;


        return (
            <Segment color="teal" >
                <Header size='medium'>Szczegóły wniosku </Header>
                <Divider></Divider>

                <Formik
                    initialValues={{}}

                    // validationSchema={}

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
                                <Grid columns={7} textAlign="right" verticalAlign="middle" >
                                    <Grid.Row>
                                        <Grid.Column width={3}>
                                            Numer wniosku</Grid.Column >
                                        <Grid.Column width={3}>
                                            <p className='data-field'>{this.props.recordDetails.id} </p>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={3}>
                                            Imię i nazwisko</Grid.Column >
                                        <Grid.Column width={3}>
                                            <p className='data-field'>{employeeName} </p>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={3}>
                                            Stanowisko/Dział</Grid.Column >
                                        <Grid.Column width={3}>
                                            <p className='data-field'>{this.props.recordDetails.user.position} </p>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={3}>
                                            Rodzaj wniosku</Grid.Column >
                                        <Grid.Column width={3}>
                                            <p className='data-field'>{this.props.recordDetails.type.description} </p>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={3}>
                                            Zakres urlopu</Grid.Column >
                                        <Grid.Column width={4}>
                                            <p className='data-field'>{datefrom} do {dateto}</p>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={3}>
                                            Liczba dni</Grid.Column >
                                        <Grid.Column width={4}>
                                            <p className='data-field'>{this.props.recordDetails.quantity}</p>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={3}>
                                            Komentarz</Grid.Column >
                                        <Grid.Column width={4}>
                                            <p className='data-field'>{this.props.recordDetails.comment}</p>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={3}>
                                            Status wniosku</Grid.Column >
                                        <Grid.Column width={2}>
                                            {label}
                                        </Grid.Column>
                                    </Grid.Row>

                                    {acceptorRow}

                                    <Grid.Row>
                                        <Grid.Column width={3}>
                                            Ostatnia zmiana statusu</Grid.Column >
                                        <Grid.Column width={3}>
                                            <p className='data-field'>{timestampDate} &nbsp;&nbsp; [ {timestampTime} ]</p>
                                        </Grid.Column>
                                    </Grid.Row>

                                </Grid>
                                <div className='vacation-button-row'> {leftButton}{rightButton} </div>

                            </Form>
                        )}
                </Formik>
            </Segment>

        )
    }
}

export default VacationDetailsComponent;