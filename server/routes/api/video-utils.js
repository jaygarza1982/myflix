var express = require('express');
var router = express.Router();
var fs = require('fs');

const { exportImage } = require('../../services/VideoUtils');

router.get('/export-from-video', (req, res) => {
    const { video } = req.query;

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
            exportImage(`/app/files/${video}`, outputImage, 2, err => {
                err ? res.status(500).send(err) : res.sendFile(outputImage);
            });
        }
    });
});

module.exports = router;
