var express = require('express');
const { register } = require('../../services/Auth');
var router = express.Router();

router.post('/login', (req, res) => {
    
});

router.post('/register', (req, res) => {
    const { username, password, confirmPassword } = req.body;

    register(username, password, confirmPassword).then(() => {
        res.send();
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    })
});

module.exports = router;
