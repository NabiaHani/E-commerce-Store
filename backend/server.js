require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const connectDB  = require('./config/db');
const authRoutes  = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
const cors = require('cors')


// database config
connectDB();

// rest object
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api', authRoutes);
app.use('/category', categoryRoutes);


// rest api
app.get('/', (req,res)=>{
    res.send({
        message: 'welcome to our website'
    })
})

// port
const PORT = process.env.PORT || 8000

// run listen
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})