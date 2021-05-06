import React from 'react';
import { CustomTextField, CustomButton, useStyles } from '../FormComponents/index';

const Register = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h2>Register</h2>
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
            <CustomTextField
                className={classes.field}
                label='Confirm Password'
                variant='outlined'
                type='password'
            />
            <br />
            <CustomButton
                variant='outlined'
            >
                Register
            </CustomButton>
        </div>
    );
}

export default Register;