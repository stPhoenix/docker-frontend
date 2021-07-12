import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import { CustomPagination } from './CustomPaginationComponent';

export const HomeComponent = ({posts_list, previous, next, paginate, title="Home", userId=null}) => {
    return (
        <section className="d-flex flex-column">
            <h3>{title}</h3>
            {posts_list.map((post) => (
                <Card className="mb-3">
                    <Card.Img width="100" height="100" variant="top" src = {post.avatar} />
                    <Card.Body>
                        <Card.Title>Author: <Link to={`/posts/user/${post.author}`}>{post.author_name}</Link></Card.Title>
                        <Card.Text>
                            {post.title}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Created: {post.created}</ListGroupItem>
                        <ListGroupItem>Updated: {post.updated}</ListGroupItem>
                        <ListGroupItem>Comments: {post.comments__count}</ListGroupItem>
                        <ListGroupItem>Rates: {post.rating__count}</ListGroupItem>
                        <ListGroupItem>Average rate: {post.rating__rate__avg}</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {post.author === userId ?
                            <p><Link to={`/post/my/${post.id}`}>Read</Link>
                                <Link to={`/edit/${post.id}`}> Edit</Link>
                            </p>
                            :
                            <Link to={`/post/${post.id}`}>Read</Link>
                            }
                    </Card.Body>

                </Card>
            ))}
        
        <CustomPagination next={next} previous={previous} paginate={paginate} />

        </section>
    );
}