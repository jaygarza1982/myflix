var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('This is the route that would return a list of files.');
});

module.exports = router;
