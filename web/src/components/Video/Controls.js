import React from 'react';
import Slider from '@material-ui/core/Slider';
import { Button, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    slider: {
        width: '75%',
    },
    image: {
        height: '300px',
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
                // scale={x => x/5}
                valueLabelFormat={value => {
                    return `${chopTimes[0]} - ${chopTimes[1]}s`
                }}
                max={props.duration}
                className={classes.slider} 
                onChange={handleChopChange}
                value={chopTimes}
                valueLabelDisplay='auto'
                onChangeCommitted={() => console.log(chopTimes[0], chopTimes[1])}
            />
            <Grid container justify={'center'}>
                <Grid
                    item
                    xs={6}
                >
                    <img
                        className={classes.image}
                        src={`/api/video-utils/export-from-video?video=${props.video}&time=${chopTimes[0]}`}
                    />
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <img
                        className={classes.image}
                        src={`/api/video-utils/export-from-video?video=${props.video}&time=${chopTimes[1]}`}
                    />
                </Grid>
            </Grid>
            <Button
                className='button'
            >
                Export
            </Button>
        </div>
    );
}

export default Controls;