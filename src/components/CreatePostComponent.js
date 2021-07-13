import Button from 'react-bootstrap/Button'
import React from 'react';
import Form from 'react-bootstrap/Form'

export const CreatePostComponent = ({ handleChange, sendPost, title, text }) => {

    return (
        <section className="d-flex flex-column">

            <Form>
                <h5>Create post</h5>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Post title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" name="title" value={title} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicText">
                    <Form.Label>Post text</Form.Label>
                    <Form.Control type="text" placeholder="Enter text" name="text" value={text} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={sendPost}>
                    Submit
                </Button>
            </Form>
        </section>
    );
}