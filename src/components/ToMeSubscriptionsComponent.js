import React from "react";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { CustomPagination } from "./CustomPaginationComponent";


export const ToMeSubscriptionsComponent = (props) => {
    return (
        <section className="d-flex flex-column">
            <br />
            <h3>To Me Subscriptions list</h3>
            <br/>
                <Table>
                    <thead>
                        <th>Created</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {
                            props.subscriptions_list.map(subscription => {
                                return(
                                    <tr key={subscription.id}>
                                        <td>{subscription.created}</td>
                                        <td>{subscription.author_username}</td>
                                        <td>{subscription.status_text}</td>
                                        <td><Button disabled={subscription.status !== 1} variant="outline-success" onClick={(e) => (props.onClick({"id": subscription.id, "target":subscription.target, "status": 2}))}>Accept request</Button>
                                            {"          "}
                                            <Button disabled={subscription.status !== 1} variant="outline-danger" onClick={(e) => (props.onClick({"id": subscription.id, "target":subscription.target, "status": 3}))}>Deny request</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <CustomPagination next={props.next} previous={props.previous} paginate={props.paginate} />
        </section>
    )
}