import React from "react";
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import { CustomPagination } from "./CustomPaginationComponent";


export const UsersComponent = (props) => {
    return (
        <section className="d-flex flex-column">
            <br />
            <h3>Users list</h3>
            <br/>
                <Table>
                    <thead>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {
                            props.user_list.map(user => {
                                return(
                                    <tr key={user.id}>
                                        <td><Image width="100" height="100" thumbnail={true} src={user.avatar} /></td>
                                        <td>{user.username}</td>
                                        <td><Button value={user.id} variant="outline-primary" onClick={props.onClick}>Send request</Button></td>
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