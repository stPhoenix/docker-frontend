import React from 'react';

export const SignUpComponent = (props) => {
    return (
    <section>
        <h2>Sign Up</h2>
        <form className="d-flex flex-column mb-4" >
            <div className="m-2 form-group">
                <label htmlFor="username">Username</label>
                <input className="form-control" type="text" name="username" id="username" placeholder="Username" onChange={props.handleChange} value={props.username} />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control" type="password" name="password" id="password" placeholder="Password" onChange={props.handleChange} value={props.password} />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control" type="text" name="email" id="email" placeholder="Email" onChange={props.handleChange} value={props.email} />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="avatar">Avatar</label>
                <input className="form-control" type="file" name="avatar" id="avatar" placeholder="Avatar" onChange={props.handleChangeFile} />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="banner">Banner</label>
                <input className="form-control" type="file" name="banner" id="banner" placeholder="Banner" onChange={props.handleChangeFile} />
            </div>

			<button className="btn align-self-center px-3" onClick={props.click}>SignUp</button>
		</form>
    </section>
    );
};