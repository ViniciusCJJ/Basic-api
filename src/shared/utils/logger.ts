/* eslint-disable @typescript-eslint/no-shadow */
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, json, colorize } = format;

const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${level}: ${message} ${timestamp}`;
  }),
);

const logger = createLogger({
  level: 'info',
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({
      filename: 'app.log',
      dirname: 'logs',
      maxsize: 10485760,
      maxFiles: 10,
    }),
  ],
});

export default logger;
