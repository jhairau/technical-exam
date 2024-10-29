import fs from "fs";

// NOTE: Just use Winston. No need to have your own logger

const stdLogger = console.log;
const stdError = console.error; // NOTE: Why?
const logFile = fs.createWriteStream("logs.log", { flags: "a" }); // Note: destined to fail

class Logger {
  constructor() {}

  log(...args: any[]) {
    stdLogger(...args);
    logFile.write(JSON.stringify(args));
    logFile.write("\n");
  }
  error(...args: any[]) {
    stdError(...args);
    logFile.write(JSON.stringify(args));
    logFile.write("\n");
  }
}

const logger = new Logger();

if (process.env.NODE_ENV == "production") {
  console.log = logger.log;
  console.error = logger.error;
}
