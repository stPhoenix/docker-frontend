import React from 'react';

export const LoginComponent = (props) => {
    return (
        <section>
            <h2>Login</h2>
            <form className="d-flex flex-column">
                <input className="m-2 custom-form-control" type="text" name="username" id="username" placeholder="Enter username" onChange={props.onChange} />
                <input className="m-2 custom-form-control" type="password" name="password" id="upassword" placeholder="Enter password" onChange={props.onChange} />
                <button className="custom-btn theme-primary m-2 px-4 align-self-center" onClick={props.click}>Login</button>
            </form>
        </section>
    );
}