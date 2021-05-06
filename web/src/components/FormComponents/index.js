import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        color: 'white',
    },
    field: {
        margin: 15,
        width: '75%',
        maxWidth: 415,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    input: {
        color: 'white',
    },
});

const CustomTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiFormLabel-root': {
            color: 'white',
        },
        '& .MuiInputBase-root': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
        },
    },
})(TextField);

const CustomButton = withStyles({
    root: {
        border: '2px solid',
        borderColor: '#3f51b5',
        color: 'white',
    },
})(Button);

export { useStyles, CustomTextField, CustomButton }
