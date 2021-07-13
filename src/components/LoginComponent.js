import Button from 'react-bootstrap/Button'
import React from 'react';
import Form from 'react-bootstrap/Form'

export const LoginComponent = (props) => {
    return (
        <section>
            <h2>Login</h2>
            <Form>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" id="username" placeholder="Enter username" onChange={props.onChange} />
                </Form.Group>
                <Form.Group controlId="formBasicText">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" id="upassword" placeholder="Enter password" onChange={props.onChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={props.click}>
                    Login
                </Button>
            </Form>
        </section>
    );
}