import { makeStyles } from '@material-ui/core';
import React from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import Controls from './Controls';

const useStyles = makeStyles({
    videoContainer: {
        padding: '35px',
    }
});

const VideoViewer = () => {
    const classes = useStyles();

    const { video } = useParams();

    const [videoDuration, setVideoDuration] = React.useState(0);

    const onProgress = () => {
        console.log('Current video time:', videoRef?.current?.getCurrentTime());
    }

    const onReady = () => {
        setVideoDuration(videoRef?.current?.getDuration());
    }

    const videoRef = React.useRef();

    return (
        <div>
            <div className={classes.videoContainer}>
                <ReactPlayer
                    playing
                    controls
                    url={`/static-file/${video}`}
                    width={'100%'}
                    height={'75vh'}
                    progressInterval={300}
                    onProgress={onProgress}
                    onReady={onReady}
                    ref={videoRef}
                />
            </div>
            <Controls
                duration={videoDuration}
                video={video}
            />
        </div>
    );
}

export default VideoViewer;
