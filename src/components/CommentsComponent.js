import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import { CustomPagination } from './CustomPaginationComponent';

export const CommentsComponent = ({ comments_list, previous, next, paginate, title = "Comments" }) => {
    return (
        <section className="d-flex flex-column">
            <h3>{title}</h3>
            {comments_list.map((comment) => (
                <Card className="mb-3" key={comment.id}>
                    <Card.Img width="100" height="100" variant="top" src={comment.avatar} />
                    <Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Created: {comment.created}</ListGroupItem>
                            <ListGroupItem>Updated: {comment.updated}</ListGroupItem>
                        </ListGroup>
                        <Card.Title>Author: <Link to={`/comments/user/${comment.author}`}>{comment.author_name}</Link></Card.Title>
                        <Card.Text>
                            {comment.text}
                        </Card.Text>
                    </Card.Body>

                    <Card.Body>
                    </Card.Body>

                </Card>
            ))}

            <CustomPagination next={next} previous={previous} paginate={paginate} />

        </section>
    );
}