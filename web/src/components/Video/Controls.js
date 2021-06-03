import React from 'react';
import { Button, makeStyles, Select, MenuItem, Modal, Paper } from '@material-ui/core';
import { CustomTextField } from 'components/FormComponents';

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
    field: {
        margin: 10
    }
});

const Controls = props => {
    const classes = useStyles();

    const [startChopTime, setStartChopTime] = React.useState('0');

    //Convert duration seconds to hour minute second
    const [endChopTime, setEndChopTime] = React.useState(`${new Date(props.duration * 1000).toISOString().substr(11, 8)}`);

    const [exportFormat, setExportFormat] = React.useState('mp4');

    const handleExportChange = event => {
        setExportFormat(event.target.value);
    }

    const [open, setOpen] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState('');
    
    const handleStartChopChange = e => {
        setStartChopTime(e.target.value);
    };

    const handleEndChopChange = e => {
        setEndChopTime(e.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveExport = () => {
        const fetchURL = `/api/video-utils/export-video-segment?video=${props.video}&format=${exportFormat}&startTime=${startChopTime}&endTime=${endChopTime}`;
        fetch(fetchURL).then(resp => {
            if (resp.status === 200) {
                resp.json().then(json => {
                    //Remove the '/app/exported-files'
                    setModalMessage(json.outputPath.split('/').splice(3).join('/'));
                    setOpen(true);
                });
            }
        });
    }

    return (
        <div className={classes.root}>
            <h3 className='openSansTitle'>Export</h3>
            <CustomTextField
                className={classes.field}
                label='Start (HH:MM:SS)'
                name='startTime'
                variant='outlined'
                value={startChopTime}
                onChange={handleStartChopChange}
                autoComplete='off'
            />
            <br />
            <CustomTextField
                className={classes.field}
                label='End (HH:MM:SS)'
                name='endTime'
                variant='outlined'
                value={endChopTime}
                onChange={handleEndChopChange}
                autoComplete='off'
            />
            <br />
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