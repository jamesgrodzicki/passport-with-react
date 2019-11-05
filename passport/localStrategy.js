import User from '../database/models/user';
import LocalStrategy from ('passport-local').Strategy;

const strategy = new LocalStrategy(
    {
        usernameField: 'username'
    }, (username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if(!user) {
                return done(null, false, { message: 'No Known Username' });
            }
            if (!user.checkPassword(password)) {
                return done(null, false, { message: 'Incorrect Password' });
            }
            return done(nulll, user);
        });
    }
);

module.exports = strategy;