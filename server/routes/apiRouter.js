const router= require('express').Router()
const path= require('path')
const env= require('dotenv').config({path: path.join(__dirname,"/.env")})
const fs = require('fs')


/********************* BITCOIN ********************** */

/**
 * Gets most recent cryto data
 * @return {JSON} Date and cryto price
 */

router.get('/bitcoin/recent',(req,res)=>{
    const cryptoFile = fs.readFileSync(path.join(__dirname,'../bitcoin/data.json'));
    const data = JSON.parse(cryptoFile);
    let recentData= data[Object.keys(data)[0]]
    res.status(200).send(recentData)
})

/**
 * Gets first n-th data sets from cryto data
 * @return {JSON} n-th Dates and cryto prices
 */
router.get('/bitcoin/:amount',(req,res)=>{
    const cryptoFile = fs.readFileSync(path.join(__dirname,'../bitcoin/data.json'));
    const data = JSON.parse(cryptoFile);
    const amount= req.params.amount;
    let dataSet={}

    for(let i=0; i<amount; i++){
        dataSet[i]=(data[Object.keys(data)[i]])
    }

    res.status(200).send(dataSet)
}) 

/**
 * Gets all cryto data since 2013 to most recent date
 * @return {JSON} All Dates and cryto prices
 */
router.get('/bitcoin', (req,res)=>{
    const cryptoFile = fs.readFileSync(path.join(__dirname,'../bitcoin/data.json'));
    const data = JSON.parse(cryptoFile);
    res.status(200).send(data)
})

/********************* ETHEREUM ********************** */

/**
 * Gets most recent cryto data
 * @return {JSON} Date and cryto price
 */

router.get('/ethereum/recent',(req,res)=>{
    const cryptoFile = fs.readFileSync(path.join(__dirname,'../ethereum/ethereumData.json'));
    const data = JSON.parse(cryptoFile);
    let recentData= data[Object.keys(data)[0]]
    res.status(200).send(recentData)
})

/**
 * Gets first n-th data sets from cryto data
 * @return {JSON} n-th Dates and cryto prices
 */
router.get('/ethereum/:amount',(req,res)=>{
    const cryptoFile = fs.readFileSync(path.join(__dirname,'../ethereum/ethereumData.json'));
    const data = JSON.parse(cryptoFile);
    const amount= req.params.amount;
    let dataSet={}

    for(let i=0; i<amount; i++){
        dataSet[i]=(data[Object.keys(data)[i]])
    }

    res.status(200).send(dataSet)
}) 

/**
 * Gets all cryto data since 2013 to most recent date
 * @return {JSON} All Dates and cryto prices
 */
router.get('/ethereum', (req,res)=>{
    const cryptoFile = fs.readFileSync(path.join(__dirname,'../ethereum/ethereumData.json'));
    const data = JSON.parse(cryptoFile);
    res.status(200).send(data)
})


/********************* XRP ********************** */

/**
 * Gets most recent cryto data
 * @return {JSON} Date and cryto price
 */

router.get('/xrp/recent',(req,res)=>{
    const cryptoFile = fs.readFileSync(path.join(__dirname,'../xrp/xrpData.json'));
    const data = JSON.parse(cryptoFile);
    let recentData= data[Object.keys(data)[0]]
    res.status(200).send(recentData)
})

/**
 * Gets first n-th data sets from cryto data
 * @return {JSON} n-th Dates and cryto prices
 */
router.get('/xrp/:amount',(req,res)=>{
    const cryptoFile = fs.readFileSync(path.join(__dirname,'../xrp/xrpData.json'));
    const data = JSON.parse(cryptoFile);
    const amount= req.params.amount;
    let dataSet={}

    for(let i=0; i<amount; i++){
        dataSet[i]=(data[Object.keys(data)[i]])
    }

    res.status(200).send(dataSet)
}) 

/**
 * Gets all cryto data since 2013 to most recent date
 * @return {JSON} All Dates and cryto prices
 */
router.get('/xrp', (req,res)=>{
    const cryptoFile = fs.readFileSync(path.join(__dirname,'../xrp/xrpData.json'));
    const data = JSON.parse(cryptoFile);
    res.status(200).send(data)
})



/****** CORONAVIRUS (WILL BE TOOK DOWN SOON) ********/

router.get('/corona/:amount',(req,res)=>{
    const coronaFile= fs.readFileSync(path.join(__dirname,'../corona/coronaData.json'))
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


router.get('/corona',(req,res)=>{
    const coronaFile= fs.readFileSync(path.join(__dirname,'../corona/coronaData.json'))
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


router.get('/fearGreed/:amount',(req,res)=>{
    const coronaFile= fs.readFileSync(path.join(__dirname,'../fearGreedIndex/fearGreedIndexData.json'))
    const data= JSON.parse(coronaFile);
    
    const amount= req.params.amount;
    let dataSet={}
    let index=0;

    //Gets data starting from newest to oldest date but skipping first data point. it's the time until next update
    for(let i=1; i<=amount; i++){
       dataSet[index]=(data[Object.keys(data)[i]])
       index++;
    }

    res.status(200).send(dataSet)
})

router.get('/fearGreed',(req,res)=>{
    const fearFile= fs.readFileSync(path.join(__dirname,'../fearGreedIndex/fearGreedIndexData.json'))
    const data= JSON.parse(fearFile);
    let dataSet={}
    let index=0;
    const end= Object.keys(data).length-1

    //Gets data starting from newest to oldest date (reverse JSON)
    for(let i=1; i<end; i++){
       dataSet[index]=(data[Object.keys(data)[i]])
       index++;
    }
    res.status(200).send(dataSet)
})



module.exports= router
