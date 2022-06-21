import { Button } from '@mui/material';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { GoogleLoginButton } from "react-social-login-buttons";
// import dotEnv from '../../utils/dotEnv';

const GoogleButton = () => {
    const responseGoogleSuccess = (response) => {
        console.log('response', response);
    };
    const responseGoogleFailure = (error) => console.log('fail', error);
    return (
        <GoogleLogin
            disabled={false}
            clientId={"362396372866-g98m1mrstkbsu0oerveha80gvrp710pe.apps.googleusercontent.com"}
            render={(props) => (
                <GoogleLoginButton onClick={props.onClick}/>
                )
            }
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFailure}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default GoogleButton;