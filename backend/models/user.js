import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'student',
    },
    subjects: {
        type: String,
        default: null,
    },
    classes: {
        type: String,
        default: null,
    },
}, { timestamps: true });

UserSchema.statics.signup = async function (username, password, role, subjects, classes) {
    if (!username || !password) {
        throw Error('All fields must be filled');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }

    const exists = await this.findOne({ username });
    if (exists) {
        throw Error('Username already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, password: hash, role, subjects, classes });

    return user;
}

UserSchema.statics.login = async function (username, password) {
    if (!username || !password) {
        throw Error('All fields must be filled');
    }
    const user = await this.findOne({ username });
    if (!user) {
        throw Error('Incorrect username or password');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect username or password');
    } 
    return user;
}

const User = mongoose.model('User', UserSchema);
export default User;