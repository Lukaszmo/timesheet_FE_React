import React, { Component, Fragment } from "react";
import { Segment, Header, Divider } from 'semantic-ui-react';
import { Form, Grid, Input } from 'semantic-ui-react';
import { Formik } from 'formik';
import CustomLabel from '../../../common/CustomLabel/CustomLabel';



class UsersComponent extends Component {

    handleChange(e, data, setFieldValue) {

        setFieldValue(data.name, data.value);
    }

    render() {


        return (

            <Segment color="teal" className='' >
                <Header size='medium'>Nowy użytkownik</Header>
                <Divider></Divider>

                <Formik
                    initialValues={{ username: '', regnum: '', password: '' }}

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

                                <Grid columns={5} textAlign="right" verticalAlign="middle" >

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Nazwa Użytkownika</p>
                                        </Grid.Column >
                                        <Grid.Column width={3}>
                                            <Input
                                                type="text"
                                                name='username'
                                                value={values.username}
                                                onChange={(e, data) => this.handleChange(e, data, setFieldValue)} />
                                            {errors.username && touched.username ? <div><CustomLabel text={errors.username}></CustomLabel></div> : null}
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Hasło</p>
                                        </Grid.Column >
                                        <Grid.Column width={3}>
                                            <Input
                                                type="password"
                                                name='username'
                                                value={values.password}
                                            />
                                            {errors.password && touched.password ? <div><CustomLabel text={errors.password}></CustomLabel></div> : null}
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2}>
                                            <p className='data-field-header'>Numer ewidencyjny</p>
                                        </Grid.Column >
                                        <Grid.Column width={3}>
                                            <Input
                                                type="number"
                                                name='regnum'
                                                value={values.regnum}
                                            />
                                            {errors.regnum && touched.regnum ? <div><CustomLabel text={errors.regnum}></CustomLabel></div> : null}
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form >
                        )
                    }
                </Formik>

            </Segment >


        )
    }
}

export default UsersComponent;