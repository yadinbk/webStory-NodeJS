const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'public',
        enum: ['public', 'private']

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

StorySchema.plugin(findOrCreate);

module.exports = mongoose.model('Story', StorySchema)
