import React from 'react';
import { CustomTextField, CustomButton, useStyles } from '../FormComponents/index';

const Login = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h2>Login</h2>
            <CustomTextField
                className={classes.field}
                label='Username'
                variant='outlined'
            />
            <br />
            <CustomTextField
                className={classes.field}
                label='Password'
                variant='outlined'
                type='password'
            />
            <br />
            <CustomButton
                variant='outlined'
            >
                Login
            </CustomButton>
        </div>
    );
}

export default Login;