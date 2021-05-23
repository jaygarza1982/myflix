import axios from 'axios';
import React, { useState } from 'react';
import { CustomTextField, CustomButton, useStyles } from '../FormComponents/index';

const Register = props => {
    const classes = useStyles();

    const [state, setState] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleTextChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    const sendRegister = () => {
        axios.post('/api/auth/register', state).then(resp => {
            if (resp.status === 200) {
                console.log('Registered!');
            }
        }).catch(err => {
            console.log(`Could not post credentials ${err}`);
        });
    }

    return (
        <div className={classes.root}>
            <h2>Register</h2>
            <CustomTextField
                className={classes.field}
                label='Username'
                name='username'
                variant='outlined'
                value={state.username}
                onChange={handleTextChange}
            />
            <br />
            <CustomTextField
                className={classes.field}
                label='Password'
                name='password'
                variant='outlined'
                type='password'
                value={state.password}
                onChange={handleTextChange}
            />
            <br />
            <CustomTextField
                className={classes.field}
                label='Confirm Password'
                name='confirmPassword'
                variant='outlined'
                type='password'
                value={state.confirmPassword}
                onChange={handleTextChange}
            />
            <br />
            <CustomButton
                variant='outlined'
                onClick={sendRegister}
            >
                Register
            </CustomButton>
        </div>
    );
}

export default Register;