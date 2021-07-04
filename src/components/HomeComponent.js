import React from 'react';

export const HomeComponent = (props) => {
    return (
        <section>
            Home
            {props.children}
        </section>
    );
}