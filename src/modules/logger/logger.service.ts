import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService extends Logger {
  private readonly logger: winston.Logger;

  constructor(context: string) {
    super(context);

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
      transports: [
        // new winston.transports.DailyRotateFile({
        //   dirname: `logs/${context}/info`,
        //   filename: '%DATE%.log',
        //   datePattern: 'YYYY-MM-DD',
        //   level: 'info',
        //   zippedArchive: true,
        // }),
        // new winston.transports.DailyRotateFile({
        //   dirname: `logs/${context}/debug`,
        //   filename: '%DATE%.log',
        //   datePattern: 'YYYY-MM-DD',
        //   level: 'debug',
        //   zippedArchive: true,
        // }),
        // new winston.transports.DailyRotateFile({
        //   dirname: `logs/${context}/error`,
        //   filename: '%DATE%-error.log',
        //   datePattern: 'YYYY-MM-DD',
        //   level: 'error',
        //   zippedArchive: true,
        // }),
        new winston.transports.Console({
          format: winston.format.combine(
            // Add a timestamp to the console logs
            winston.format.timestamp(),
            // Add colors to you logs
            winston.format.colorize(),
            // What the details you need as logs
            winston.format.printf(({ timestamp, level, message, context, trace }) => {
              return `${timestamp} ${level}: ${message}${trace ? `\n${trace}` : ''}`;
            }),
          ),
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }
}
