import React from "react";


export const UsersComponent = (props) => {
    return (
        <section>
            <h3>Users list</h3>
            <br />
                <ul>
                {props.user_list.map(user => {
                   return(<li>{user.username}</li> )
                })}
                </ul>
        </section>
    )
}