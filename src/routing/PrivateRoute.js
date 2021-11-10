import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useData } from "../providers/DataProvider";

const PrivateRoute = ({component: Component, ...rest}) => {

    const { data, setData } = useData();
    const userdata = data.userdata;

    return (

        <Route {...rest} render={props => (
            userdata !== "" ? <Component {...props} /> : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;