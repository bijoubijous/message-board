var mongoose = require('mongoose');

//letters format
var letterSchema = new mongoose.Schema({
    date: Date,
    content: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    recipient:{
        username: String
    }
});

module.exports = mongoose.model('Letter', letterSchema);