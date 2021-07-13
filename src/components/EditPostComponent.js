import Button from 'react-bootstrap/Button'
import React from 'react';
import Form from 'react-bootstrap/Form'

export const EditPostComponent = ({ handleChange, post, title, text, updatePost, deletePost }) => {
    if (post == null)
    {
        return <div>no content</div>
    }
    return (
        <section className="d-flex flex-column">
            <Form>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Post title</Form.Label>
                    <Form.Control name="title" type="text" placeholder="Enter title" value={title} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicText">
                    <Form.Label>Post text</Form.Label>
                    <Form.Control name="text" type="text" placeholder="Enter text" value={text} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={updatePost}>
                    Submit
                </Button>
                <Button variant="danger" type="submit" onClick={deletePost}>
                    Delete Post
                </Button>
            </Form>
        </section>
    );
}