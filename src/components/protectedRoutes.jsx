import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoutes({session, component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={() => session
                ? (
                <Component/>
                ) :
                (
                    <Redirect to="/"/>
                )
            }
        />
    );
}
