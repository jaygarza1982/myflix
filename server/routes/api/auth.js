var express = require('express');
const { register, login } = require('../../services/Auth');
var router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    login(username, password).then(() => {
        req.session.username = username;
        res.send({ username });
    }).catch(err => {
        res.status(500).send(err);
    });
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

router.get('/whoami', (req, res) => {
    const { username } = req.session;

    username ? res.send({ username }) : res.status(500).send();
});

module.exports = router;
