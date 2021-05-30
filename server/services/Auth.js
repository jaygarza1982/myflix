const bcrypt = require('bcrypt');
const { find, insert } = require('./Mongo');
const saltRounds = 10;

exports.register = (username, password, confirmPassword) => {
    return new Promise((resolve, reject) => {
        if (password != confirmPassword) reject('Passwords do not match');

        return find('users', { username }).then(users => {
            //If a user already exists, reject
            if (users?.length != 0) {
                return reject('User already exists.');
            }

            //A user does not exist, we will insert data
            return bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) reject(err);

                return insert('users', {
                    username: username,
                    password: hash
                }).then(result => {
                    return resolve(result);
                });
            });
        })
        .catch(err => {
            return reject(err);
        });
    });
}

exports.login = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await find('users', { username }, { password: 1 });

            let check = await bcrypt.compare(password, user[0].password);

            check ? resolve(check) : reject(check);
            return;
        } catch (err) {
            console.log(`Could not login user ${username} ${err}`);
            reject(err);
            return;
        }
    });
}