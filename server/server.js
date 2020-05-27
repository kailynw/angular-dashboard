#!/usr/bin/env node
const express= require('express')
const path= require('path')
const morgan=require('morgan')
const nodemon= require('nodemon')
const env= require('dotenv').config({path: path.join(__dirname,"/.env")})
const fs = require('fs')
const apiRouter= require('./routes/apiRouter')
const Scrape= require("./routes/scrape")
const scrape= new Scrape()
const PORT= process.env.PORT


//Express Config 
const app= express()
app.use(express.json()) 
app.use(morgan('combined'))

 
if(process.env.NODE_ENV === 'production'){
    //Logger for routes and config for production
    app.use(express.static(path.join(__dirname,"../dist/")))
    let logStream = fs.createWriteStream(path.join(__dirname, "./log/api.log"), {flags:'a'});
    app.use(morgan('combined', { stream: logStream }));

    //Production runs scheduled scrape
    scrape.run()
}
else
    scrape.getData()




// Allow any method from any host and log requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    if('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next(); 
    }
})


//Home page for production
app.get("/",(req,res)=>{
    if(process.env.NODE_ENV==="production")
        res.sendFile(path.join(__dirname,"../dist/"))
})

//API routes
app.use('/api', apiRouter)

//Always has to be last route or it will FUCK EVERYTHING UP (e.g. redirects everything to home page that is set below it)
app.get("*", (req,res)=>{
    if(process.env.NODE_ENV==="production")
        res.redirect("/")   
})

  
app.listen(PORT)
console.log(`GO to http://localhost:${PORT}`)


