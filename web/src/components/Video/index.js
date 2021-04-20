import React from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

const VideoViewer = () => {
    const { video } = useParams();

    return (
        <>
            <ReactPlayer
                controls
                url={`/static-file/${video}`}
            />
        </>
    );
}

export default VideoViewer;