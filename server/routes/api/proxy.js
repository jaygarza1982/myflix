var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/:file', (req, res) => {
    const { file } = req.params;
    const url = `http://apache-server/${file}`;

    console.log(`Proxying "${file}" to "${url}"`);

    req.pipe(request(url)).pipe(res);
});

module.exports = router;
