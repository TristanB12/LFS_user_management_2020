const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    post_user: {
        username: {type: String, required: true},
        profile_picture: {type: String, required: true},
    },
    post_content: {
        text: {type: String, required: true},
        photo: {type: String, required: false},
    },
    stats: {
        likes: {type: Number, required: true},
        shares: {type: Number, required: true},
    },
    liked: {type: Boolean, required: true},
});

module.exports = mongoose.model('Post', postSchema);