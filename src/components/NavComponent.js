import React from 'react';
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom';


const NavComponent = ({ isAuthenticated, avatar, userName }) => {
    return (
        <section className="flex-column">
            <Image src={avatar} />
            <h3>{userName}</h3>
        <Link to="/">Home </Link>
        </section>
    )
}
export default NavComponent