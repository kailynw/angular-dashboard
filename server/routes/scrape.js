const execAsync = require("child_process").exec
const env= require("dotenv").config()
const schedule= require('node-schedule')
const path= require('path')
const fs= require('fs')
const moment= require('moment')
const Logger= require('./logger')
const scheduleLogger= new Logger();

if(process.env.NODE_ENV === 'production'){
    const logStream = fs.createWriteStream(path.join(__dirname, ".././log/schedule.log"), {flags:'a'});
    scheduleLogger.setStream(logStream)
    scheduleLogger.setLogLevel(5)    
}

class Scrape{
    
    /**
     * Asynrounously scrapes per service
     */
    getData(time){
        execAsync(`python3 ${path.join(__dirname, '../bitcoin/scrape.py')}`,function(error, stdout, stderr){
            if(error){
                scheduleLogger.error("Bitcoin Scrape Err: ")
                scheduleLogger.error(stderr)
                scheduleLogger.error("err: ", )
            }
            else
                scheduleLogger.info("Bitcoin Scrape Successful")
        })

        execAsync(`python3 ${path.join(__dirname, '../corona/coronaData.py')}`,function(error, stdout, stderr){

            if(error)
                scheduleLogger.error("Coronavirus Scrape Err: ", error)
            else
                scheduleLogger.info("Coronavirus Scrape Successful")
        })

        execAsync(`python3 ${path.join(__dirname, '../fearGreedIndex/fearGreedIndexData.py')}`,function(error, stdout, stderr){
            if(error)
                scheduleLogger.error("Fear of Greed Index Scrape Err: ", error)
            else
                scheduleLogger.info("Fear of Greed Index Scrape Successful")
        })

        execAsync(`python3 ${path.join(__dirname, '../ethereum/scrape.py')}`,function(error, stdout, stderr){
            if(error)
                scheduleLogger.error("Ethereum Scrape Err: ", error)
            else
                scheduleLogger.info("Ethereum Scrape Successful")

        })

        execAsync(`python3 ${path.join(__dirname, '../xrp/scrape.py')}`,function(error, stdout, stderr){
            if(error)
                scheduleLogger.error("Xrp Scrape Err: ", error)
            else
                scheduleLogger.info("Xrp Scrape Successful")
        })

        execAsync(`python3 ${path.join(__dirname, '../bitcoin/news.py')}`,function(error, stdout, stderr){
            if(error)
                scheduleLogger.error("Bitcoin News Scrape Err: ", error)
            else
                scheduleLogger.info("Bitcoin News Scrape Successful")
        })
    }

    /**
     * Runs Scrape Everyday at 2am EST or 6am UTC
     */
    run(){
        const Scrape= this;
        //Schedules cront task at 2AM EST
        schedule.scheduleJob('0 6 * * *', function(date){
            let currentTime= moment(date).utc().format('MM/DD/YYYY hh:mm:ss A')
            scheduleLogger.log("")
            scheduleLogger.log("Current Time: "+currentTime)
            Scrape.getData(currentTime)
        });
    }
   
}

//new Scrape().run()

module.exports=Scrape