require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;

if (!url) {
    console.error('MONGODB_URL is not defined');
    process.exit(1);
}

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });