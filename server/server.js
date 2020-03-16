const PORT= 3000;
const express= require('express')
const path= require('path')
const morgan=require('morgan')
const nodemon= require('nodemon')
const execSync = require("child_process").execSync
const fs = require('fs');


//Express Config 
const app= express()
app.use(express.json()) 
app.use(morgan('combined'))

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
 
/**
 * Gets all cryto data since 2013 to most recent date
 * @return {JSON} All Dates and cryto prices
 */
app.get('/api/data', (req,res)=>{
    cryptoScrape()
    const cryptoFile = fs.readFileSync('./data/data.json');
    const data = JSON.parse(cryptoFile);
    console.log(data)
    res.status(200).send(data)
})

/**
 * Gets most recent cryto data
 * @return {JSON} Date and cryto price
 */
app.get('/api/data/recent',(req,res)=>{
    cryptoScrape()
    const cryptoFile = fs.readFileSync('./data/data.json');
    const data = JSON.parse(cryptoFile);
    let recentData= data[Object.keys(data)[0]]
    res.status(200).send(recentData)
})
  
app.listen(PORT)
console.log(`GO to http://localhost:${PORT}/api/data`)


           
/**
 * Scrapes cryto data and writes to JSON file
 */
function cryptoScrape(){
    //Create child process
    const scrape = execSync('python3 ./data/scrape.py').output
    const writeData = execSync('python3 ./data/scrape2json.py').output;
}
