var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    const queryDir = req.query.dir || '';

    try {
        const listingDir = `${process.env.MEDIA_FILES_PATH}${queryDir  == '' ? '' : `/${queryDir}`}`;

        let dirList = fs.readdirSync(listingDir);
        let filesAndDirs = [];

        //Build directory listing with metadata about the file
        dirList.forEach(listing => {
            let listingStats = fs.lstatSync(`/app/${listingDir}/${listing}`);

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
