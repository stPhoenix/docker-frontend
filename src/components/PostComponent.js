import Button from 'react-bootstrap/Button'
import React from 'react';
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { CommentsComponent } from './CommentsComponent';
import Form from 'react-bootstrap/Form'

export const PostComponent = ({ comments_list, previous, next, paginate, post, ratePost, commentInput, handleChange, sendComment }) => {
    if (post == null)
    {
        return <div>no content</div>
    }
    return (
        <section className="d-flex flex-column">

            <h3>{post.title}</h3>
            <p>{post.text}</p>

            <Card>
                <Card.Header as="h5">Average rating: {post.rating__rate__avg === null ? 1 : post.rating__rate__avg}</Card.Header>
                <Card.Body>
                    <Card.Title>
                        Rate post:
                    </Card.Title>
                    <ButtonGroup aria-label="Rate button group">
                        <Button value="1" variant="outline-danger" onClick={ratePost}>1</Button>
                        <Button value="2" variant="outline-info" onClick={ratePost}>2</Button>
                        <Button value="3" variant="outline-warning" onClick={ratePost}>3</Button>
                        <Button value="4" variant="outline-primary" onClick={ratePost}>4</Button>
                        <Button value="5" variant="outline-success" onClick={ratePost}>5</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
            <Form>
                <h5>Post comment:</h5>
                <Form.Group controlId="formBasicText">
                    <Form.Label>Comment text</Form.Label>
                    <Form.Control type="text" placeholder="Enter text" value={commentInput} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={sendComment}>
                    Submit
                </Button>
            </Form>
            <CommentsComponent title={`${post.comments__count} comments:`} comments_list={comments_list} previous={previous} next={next} paginate={paginate} />
        </section>
    );
}