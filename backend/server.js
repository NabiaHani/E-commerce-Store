const express = require('express')

// rest object
const app = express()

// rest api
app.get('/', (req,res)=>{
    res.send({
        message: 'welcome to our website'
    })
})

// port
const port = 8000

// run listen
app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})