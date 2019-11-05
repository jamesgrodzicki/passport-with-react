import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';
mongoose.promise = Promise;

const userSchema = new Schema({
    user: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: false,
        required: true
    }
});

userSchema.methods = {
    checkPassword: inputPassword => {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
};

userSchema.pre('save', next => {
    if(!this.password){
        console.log('models/user.js =========NO PASSWORD PROVIDED==========');
        next();
    } else {
        console.log('models/user.js hashPassword in pre save');
        this.password = this.hashPassword(this.password);
        next();
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;