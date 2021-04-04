var express = require('express');
var router = express.Router();

const { exportImage } = require('../../services/VideoUtils');

router.get('/export-from-video', (req, res) => {
    const { video } = req.query;

    //Video path with changed extension
    const outputImage = `/app/files/${video.split('.').slice(0, -1).join('')}.jpg`;

    exportImage(`/app/files/${video}`, outputImage, 2, (err) => {
        err ? res.status(500).send(err) : res.sendFile(outputImage);
    });
});

module.exports = router;
