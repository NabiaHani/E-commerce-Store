require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');

// rest object
const app = express()

// middleware
app.use(express.json())
app.use(morgan('dev'))
// rest api
app.get('/', (req,res)=>{
    res.send({
        message: 'welcome to our website'
    })
})

// mongodb connection
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// port
const PORT = process.env.PORT || 8000

// run listen
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})