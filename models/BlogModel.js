const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    subject:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
});

const BlogModel = mongoose.model('blog', blogSchema);

module.exports = BlogModel;