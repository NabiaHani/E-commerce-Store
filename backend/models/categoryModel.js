const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true
    }
},
)

const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;