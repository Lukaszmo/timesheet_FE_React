import React, { Component } from "react";
import { Form, Button, Segment } from 'semantic-ui-react';
import { Formik } from 'formik';
import './LoginComponent.css';


class LoginComponent extends Component {

    onSubmit(values) {

        this.props.login(values.login, values.password);
    };

    render() {

        return (

            < Segment className='inputs-login-container' >
                <Formik
                    initialValues={{ login: '', password: '' }}
                    //validacje

                    onSubmit={(values, { setSubmitting }) => {
                        this.onSubmit(values);
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                            <Form className='inputs-login-form' onSubmit={handleSubmit}>
                                <Form.Field
                                    name="login"
                                    className='inputs-login-form-field'
                                    placeholder="Login"
                                    control='input'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.login}
                                />
                                {errors.login && touched.login && errors.login}
                                <Form.Field
                                    type="password"
                                    name="password"
                                    className='inputs-login-form-field'
                                    placeholder="Hasło"
                                    control='input'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                {errors.password && touched.password && errors.password}
                                <Button type="submit" color="teal" disabled={isSubmitting}>
                                    ZALOGUJ SIĘ
                        </Button>
                            </Form>
                        )}
                </Formik>
            </Segment >

        )
    }
}

export default LoginComponent;