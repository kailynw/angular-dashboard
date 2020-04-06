class Logger {
    constructor(config = {}) {
      this.logLevel =  process.env.LOG_LEVEL || 2;
      console.log(`Log level set to: ${this.logLevel}. Update with logger.setLogLevel(<1-5>)`);
      this.logprint = console.log;
      let {printDate} = config;
      this.printDate = printDate;
    }

    setStream (stream) {
      if (typeof stream.write !== 'function') {
        throw new Error('Stream is not writable');
      }
      
      this.stream = stream;

      this.logprint = (message) => {
        if (this.printDate) {
          this.stream.write(new Date().toString() + ' - ');
        }

        this.stream.write(message + '\n');
      }
    }

    /** printdate only for streamed logs */
    setPrintDate (bool) {
      this.printDate = !!bool;
    }
    
    setLogLevel (level) {
      let _level = parseInt(level, 10);
      if (isNaN(_level)) {
        return this.logprint(`Could not set level, ${level} is not a number`)
      }
      this.logLevel = _level;
      this.trace(`Log level updated to ${_level}`)
    }

    trace (message) {
      if (this.logLevel < 5) {
        return;
      }
      if (typeof message === 'object') {
        message = JSON.stringify(message);
      }
      
      this.logprint(`Trace: ${message}`);
    } 
    debug (message) {
      if (this.logLevel < 4) {
        return;
      }
      if (typeof message === 'object') {
        message = JSON.stringify(message);
      }
      
      this.logprint(`Debug: ${message}`);
    }

    info (message) {
      if (this.logLevel < 3) {
        return;
      }
      if (typeof message === 'object') {
        message = JSON.stringify(message);
      }
      
      this.logprint(`Info: ${message}`);
    }

    log(message){
      if (this.logLevel < 3) {
        return;
      }
      if (typeof message === 'object') {
        message = JSON.stringify(message);
      }
      
      this.logprint(`${message}`);
  
     }
  

    warn (message) {
      if (this.logLevel < 2) {
        return;
      }
      if (typeof message === 'object') {
        message = JSON.stringify(message);
      }
      
      this.logprint(`Warning: ${message}`);
    }
    error (message) {
      if (this.logLevel < 1) {
        return;
      }
      if (typeof message === 'object') {
        message = JSON.stringify(message);
      }
      
      this.logprint(`Error: ${message}`);
    }

  }


  module.exports = Logger;