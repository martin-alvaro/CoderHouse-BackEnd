import { createLogger, transports, format } from 'winston';

const levels = {
  debug: 0,
  http: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5,
};

const colors = {
  debug: 'blue',
  http: 'green',
  info: 'cyan',
  warn: 'yellow',
  error: 'red',
  fatal: 'magenta',
};

const logger = createLogger({
  levels,
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console({ level: 'info' }), 
    new transports.File({ filename: 'src/errors.log', level: 'error' }),
  ],
});


if (process.env.NODE_ENV === 'production') {
  logger.transports[0].level = 'info'; 
}

export { logger };
