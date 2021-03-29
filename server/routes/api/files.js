var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    try {
        let dirList = fs.readdirSync(process.env.MEDIA_FILES_PATH);
        let filesAndDirs = [];

        //Build directory listing with metadata about the file
        dirList.forEach(listing => {
            let listingStats = fs.lstatSync(`/app/${process.env.MEDIA_FILES_PATH}/${listing}`);

            filesAndDirs.push({
                filename: listing,
                directory: listingStats.isDirectory(),
                size: listingStats.size,
                created: listingStats.birthtime,
            });
        });

        res.send(filesAndDirs);
    } catch (err) {
        const errorMessage = `Error reading files ${err}`;

        console.log(errorMessage);
        res.status(500).send(errorMessage);
    }
});

module.exports = router;
