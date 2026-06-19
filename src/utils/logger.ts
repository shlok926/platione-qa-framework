import winston from 'winston';
import { ConfigManager } from './config';

const logFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
  // Strip out empty metadata properties
  const metaKeys = Object.keys(metadata).filter(k => k !== 'metadata');
  if (metaKeys.length > 0) {
    const cleanMetadata: Record<string, any> = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
    metaKeys.forEach(k => {
      cleanMetadata[k] = metadata[k];
    });
    if (Object.keys(cleanMetadata).length > 0) {
      msg += ` | Metadata: ${JSON.stringify(cleanMetadata)}`;
    }
  }
  return msg;
});

export const logger = winston.createLogger({
  level: ConfigManager.logLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    }),
    new winston.transports.File({
      filename: 'logs/execution.log',
      format: winston.format.combine(
        logFormat
      )
    })
  ]
});
