import express from 'express';
const router = express.Router();
import User from '../database/models/user';
import passport from 'passport';

router.post('/', (req, res) => {
    console.log('user signup');

    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err);
        } else if (user) {
            res.json({
                error: `Sorry, already a user with that username: ${username}`
            });
        } else {
            const newUser = new User({
                username: username,
                password: password
            });
            newUser.save((err, savedUser) => {
                if (err) return res.json(err);
                res.json(savedUser);
            });
        }
    });
});

router.post('/login', (req, res, next) => {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body);;
        next();
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        const userInfo = { username: req.user.username };
        res.send(userInfo);
    }
);

router.get('/', (req, res, next) => {
    console.log('======= user! =======');
    console.log(req.user);
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.json({ user: null });
    }
});

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout();
        res.send({ msg: 'logging out' });
    } else {
        res.send({ msg: 'no user to log out' });
    }
});

module.exports = router;