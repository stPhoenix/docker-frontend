import React from "react";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { CustomPagination } from "./CustomPaginationComponent";


export const MySubscriptionsComponent = (props) => {
    return (
        <section className="d-flex flex-column">
            <br />
            <h3>My Subscriptions list</h3>
            <br/>
                <Table>
                    <thead>
                        <th>Created</th>
                        <th>Target</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {
                            props.subscriptions_list.map(subscription => {
                                return(
                                    <tr key={subscription.id}>
                                        <td>{subscription.created}</td>
                                        <td>{subscription.target_username}</td>
                                        <td>{subscription.status_text}</td>
                                        <td><Button disabled={subscription.status !== 1} value={subscription.id} variant="outline-danger" onClick={props.onClick}>Abort request</Button></td>
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