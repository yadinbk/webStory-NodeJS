const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    givenName: {
        type: String,
        required: true,
    },
    familyName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.plugin(findOrCreate);


module.exports = mongoose.model('User', UserSchema)
