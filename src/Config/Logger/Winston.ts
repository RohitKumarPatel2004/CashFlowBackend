import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
const { combine, label, printf, timestamp } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  format: combine(label({ label: 'Shopper Insight Community' }), timestamp(), customFormat),
  transports: [
    new DailyRotateFile({
      json: true,
      level: 'error',
      handleExceptions: true, 
      filename: path.resolve(__dirname, '../../../logs/', 'error.log'),
    }),
    new DailyRotateFile({
      json: true,
      level: 'info',
      handleExceptions: true, 
      filename: path.resolve(__dirname, '../../../logs/', 'app.log'),
    }),     
  ],
});


export class LogFactory {
  static getLogger(params?: {name: string}) {
    if(!params) {
      return logger;
    }
    return logger.child({name: params.name});
  }
}