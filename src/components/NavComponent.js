import React from 'react';
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom';


const NavComponent = ({ isAuthenticated, avatar, userName }) => {
    return (
        <section className="d-flex flex-column">
            <Image src={avatar} />
            <h3>{userName}</h3>
            <Link to="/">Home </Link>
        {isAuthenticated ? <Link to="/users">Users list </Link> : "" }
        {isAuthenticated ? <Link to="/subscriptions/my">My subscription requests </Link> : "" }
        {isAuthenticated ? <Link to="/subscriptions/to-me">Subscriptions requsts to me </Link> : "" }
        {isAuthenticated ? "" : <Link to="/login">Login </Link> }
        {isAuthenticated ? "" : <Link to="/signup">Sign up </Link> }

        
        
        </section>
    )
}
export default NavComponent