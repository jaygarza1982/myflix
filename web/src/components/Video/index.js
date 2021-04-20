import { makeStyles } from '@material-ui/core';
import React from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
    videoContainer: {
        padding: '35px',
    }
});

const VideoViewer = () => {
    const classes = useStyles();

    const { video } = useParams();

    return (
        <div>
            <div className={classes.videoContainer}>
                <ReactPlayer
                    playing
                    controls
                    url={`/static-file/${video}`}
                    width={'100%'}
                    height={'75vh'}
                />
            </div>
        </div>
    );
}

export default VideoViewer;
