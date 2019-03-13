const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    email: {type: mongoose.Schema.Types.String, required: true},
    fullName: { type: mongoose.Schema.Types.String },
    profilePicture: {type: mongoose.Schema.Types.String, default: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg'},
    salt: { type: mongoose.Schema.Types.String, required: true },
    roles: [{ type: mongoose.Schema.Types.String }],
    myPlaylist: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, 'Admin');
        return User.create({
            username: 'Admin',
            fullName: 'Tochka Tochkova',
            email: 'tochka@tochkova.com',
            salt,
            hashedPass,
            roles: ['Admin'],
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;
