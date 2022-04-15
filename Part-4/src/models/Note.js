const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    content: {
        type: String,
        required: true,
        minlength: 3
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    important: {
        type: Boolean,
        default: false
    },

})

module.exports = mongoose.model("Note", noteSchema);
