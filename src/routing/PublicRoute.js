import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useData } from "../providers/DataProvider";

const PublicRoute = ({component: Component, restricted, ...rest}) => {

    const { data, setData } = useData();
    const userdata = data.userdata;

    return (
        <Route {...rest} render={props => (
            userdata !== "" && restricted ? <Redirect to="/room" /> : <Component {...props} />
        )} />
    );
};

export default PublicRoute;