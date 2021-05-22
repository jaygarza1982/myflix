import React from 'react';
import { Button, Grid, makeStyles, Select, MenuItem, Slider, Modal, Paper } from '@material-ui/core';
import saveAs from 'file-saver';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    slider: {
        width: '75%',
    },
    image: {
        height: '300px',
        width: '300px',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#FFF',
        border: '2px solid #000',
        height: 200,
        padding: 15,
    },
});

const Controls = props => {
    const classes = useStyles();

    const [chopTimes, setChopTimes] = React.useState([0, props.duration]);
    const [exportFormat, setExportFormat] = React.useState('mp4');

    const handleExportChange = event => {
        setExportFormat(event.target.value);
    }

    const handleChopChange = (event, newValue) => {
        setChopTimes(newValue);
    };

    const [open, setOpen] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState('');
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveExport = () => {
        const fetchURL = `/api/video-utils/export-video-segment?video=${props.video}&format=${exportFormat}&startTime=${chopTimes[0]}&endTime=${chopTimes[1]}`;
        fetch(fetchURL).then(resp => {
            if (resp.status === 200) {
                resp.json().then(json => {
                    //Remove the '/app/exported-files'
                    setModalMessage(json.outputPath.split('/').splice(3).join('/'));
                    setOpen(true);
                });
                // resp.blob().then(blob => {
                //     const filename = `${props.video.split('.')[0]}.${exportFormat}`;
                //     saveAs(blob, filename);
                // });
            }
        });
    }

    return (
        <div className={classes.root}>
            <h2 className='openSansTitle'>
                Controls
            </h2>
            <h3 className='openSansTitle'>Chop</h3>
            <Slider
                step={0.01}
                min={0}
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
                    xs={12}
                    md={6}
                >
                    <img
                        className={classes.image}
                        src={`/api/video-utils/export-from-video?video=${props.video}&time=${chopTimes[0]}`}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    <img
                        className={classes.image}
                        src={`/api/video-utils/export-from-video?video=${props.video}&time=${chopTimes[1]}`}
                    />
                </Grid>
            </Grid>
            <Button
                className='button'
                onClick={saveExport}
            >
                Export as
            </Button>
            <Select
                className='secondary'
                value={exportFormat}
                onChange={handleExportChange}
            >
                <MenuItem value={'mp4'}>MP4</MenuItem>
                <MenuItem value={'webm'}>WEBM</MenuItem>
                <MenuItem value={'mov'}>MOV</MenuItem>
                <MenuItem value={'gif'}>GIF</MenuItem>
                <MenuItem value={'mp3'}>MP3</MenuItem>
                <MenuItem value={'flac'}>FLAC</MenuItem>
                <MenuItem value={'wav'}>WAV</MenuItem>
            </Select>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                    <h2>Job Queued</h2>
                    Your file has been queued for a job
                    <br />
                    It can later be found at <a href={`/exported-files/${modalMessage}`}>{modalMessage}</a>
                </div>
            </Modal>
        </div>
    );
}

export default Controls;