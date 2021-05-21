var express = require('express');
var router = express.Router();
var fs = require('fs');

const { exportImage, exportSegment, exportVideoSegment } = require('../../services/VideoUtils');

router.get('/export-from-video', (req, res) => {
    const { video, time } = req.query;

    //Video path with changed extension
    const outputImage = `/app/images/${video.split('.').slice(0, -1).join('')}.jpg`;
    const outputImageParentFolder = outputImage.split('/').slice(0, -1).join('/');

    //Create directory or directories where image will go
    fs.mkdir(outputImageParentFolder, { recursive: true }, directoryError => {
        if (directoryError) {
            res.status(500).send(directoryError);
        }
        else {
            //Export the from from video file and send the image
            exportImage(`/app/files/${video}`, outputImage, time ? time : '2.00', err => {
                err ? res.status(500).send(err) : res.sendFile(outputImage);
            });
        }
    });
});

router.get('/export-video-segment', (req, res) => {
    const { video, format, startTime, endTime } = req.query;

    const outputPath = `/app/exported-files/${video}-${new Date().getTime()}${ format ? `.${format}` : ''}`;
    const outputFileParentFolder = outputPath.split('/').slice(0, -1).join('/');

    //Create directory or directories where file will go
    console.log(`Creating directory ${outputFileParentFolder}`);
    fs.mkdir(outputFileParentFolder, { recursive: true }, directoryError => {
        if (directoryError) {
            res.status(500).send(directoryError);
        }
        else {
            //Start export process of video. Send back success of job start
            exportVideoSegment(`/app/files/${video}`, outputPath, startTime, endTime, err => {
                if (err) {
                    console.log(`Could not export to ${outputPath}. Reason "${err}"`);
                }
                else {
                    console.log(`Successfully output to ${outputPath}`);
                }
            });

            //Send where output will be once exported
            res.send({ outputPath });
        }
    });
});

module.exports = router;
