const PORT= 3000;
const express= require('express')
const path= require('path')
const morgan=require('morgan')
const nodemon= require('nodemon')
const app= express()

app.get('/api/data', (req,res)=>{
    console.log("hey")
    res.send("kailyn Made this")
})
app.listen(3000)
console.log(`GO to http://localhost:${PORT}/api/data`)