import passport from 'passport';
import LocalStrategy from './localStrategy';
import User from '../database/models/user';

passport.serializeUser((user, done) => {
    console.log('*** serializeUser called, user: ');
    console.log(user);
    console.log('----------');
    done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
    console.log('deserializeUser called');
    User.findOne(
        { _id: id },
        'username',
        (err, user) => {
            console.log('*** deserializeUser');
            console.log(user);
            console.log('-------------');
            done(null, user);
        }
    );
});

passport.use(LocalStrategy);

module.exports = passport;