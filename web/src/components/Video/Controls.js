import React from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    slider: {
        width: '75%',
    }
});

const Controls = props => {
    const classes = useStyles();

    const [chopTimes, setChopTimes] = React.useState([0, props.duration]);

    const handleChopChange = (event, newValue) => {
        setChopTimes(newValue);
    };

    return (
        <div className={classes.root}>
            <h2 className='openSansTitle'>
                Controls
            </h2>
            <h3 className='openSansTitle'>Chop</h3>
            <Slider
                step={0.01}
                min={0}
                max={props.duration}
                className={classes.slider} 
                onChange={handleChopChange}
                value={chopTimes}
                valueLabelDisplay='auto'
                // getAriaValueText={valuetext}
            />
        </div>
    );
}

export default Controls;