#!/usr/bin/env node
const express= require('express')
const path= require('path')
const morgan=require('morgan')
const nodemon= require('nodemon')
const env= require('dotenv').config()
const execSync = require("child_process").execSync
const fs = require('fs');

//Scrape Data
bitcoinScrape()
coronaVirusScrape()


//Express Config 
const app= express()
app.use(express.json()) 
app.use(morgan('combined'))
 
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,"../dist/")))
}


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

app.get("/",(req,res)=>{
    if(process.env.NODE_ENV==="production")
        res.sendFile(path.join(__dirname,"../dist/"))
})

/**
 * Gets all cryto data since 2013 to most recent date
 * @return {JSON} All Dates and cryto prices
 */
app.get('/api/bitcoin', (req,res)=>{
    const cryptoFile = fs.readFileSync('./bitcoin/data.json');
    const data = JSON.parse(cryptoFile);
    console.log(data)
    res.status(200).send(data)
})

/**
 * Gets first n-th data sets from cryto data
 * @return {JSON} n-th Dates and cryto prices
 */
app.get('/api/bitcoin/:amount',(req,res)=>{
    const cryptoFile = fs.readFileSync('./bitcoin/data.json');
    const data = JSON.parse(cryptoFile);
    const amount= req.params.amount;
    let dataSet={}

    for(let i=0; i<amount; i++){
        dataSet[i]=(data[Object.keys(data)[i]])
    }

    res.status(200).send(dataSet)
})

/**
 * Gets most recent cryto data
 * @return {JSON} Date and cryto price
 */
app.get('/api/bitcoin/recent',(req,res)=>{
    const cryptoFile = fs.readFileSync('./bitcoin/data.json');
    const data = JSON.parse(cryptoFile);
    let recentData= data[Object.keys(data)[0]]
    res.status(200).send(recentData)
})



app.get('/api/corona',(req,res)=>{
    const coronaFile= fs.readFileSync('./corona/coronaData.json')
    const data= JSON.parse(coronaFile);
    let dataSet={}
    const end= Object.keys(data).length-1
    let index=0;

    //Gets data starting from newest to oldest date (reverse JSON)
    for(let i=end; i>0; i--){
       dataSet[index]=(data[Object.keys(data)[i]])
       index++;
    }
    res.status(200).send(dataSet)
})

app.get('/api/corona/:amount',(req,res)=>{
    const coronaFile= fs.readFileSync('./corona/coronaData.json')
    const data= JSON.parse(coronaFile);
    
    const amount= req.params.amount;
    let dataSet={}
    const end= Object.keys(data).length-1
    let index=0;

    //Gets data starting from newest to oldest date (reverse JSON)
    for(let i=end; i>(end-amount); i--){
       dataSet[index]=(data[Object.keys(data)[i]])
       index++;
    }

    res.status(200).send(dataSet)
})

app.get("*", (req,res)=>{
    if(process.env.NODE_ENV==="production")
        res.redirect("/")    
})

   
app.listen(process.env.PORT)
console.log(`GO to ${process.env.PORT}/api/bitcoin`)



           
/**
 * Scrapes cryto data and writes to JSON file
 */
function bitcoinScrape(){
    //Create child process
    const scrape = execSync('python3 ./bitcoin/scrape.py').output
}

function coronaVirusScrape(){
    const writeData= execSync('python3 ./corona/coronaData.py').output
}


