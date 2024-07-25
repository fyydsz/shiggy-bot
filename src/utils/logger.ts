import winston, {format} from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, json, errors } =  format;

const errorTransport = new DailyRotateFile({
    filename: "./logs/error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    level: "error",
    maxSize: "20m",
    maxFiles: "14d",
    format: combine(errors({ stack: true }), timestamp(), json()),
});

const logger = winston.createLogger({
    format: combine(errors({ stack: true }), timestamp(), json()),
    transports: [errorTransport],
})

export default logger;