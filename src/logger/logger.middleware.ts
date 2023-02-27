import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  _context = 'HTTP';
  constructor(private logger: LoggerService) {}
  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, originalUrl, body, query } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method} ${originalUrl} query: ${JSON.stringify(
        query,
      )}; body: ${JSON.stringify(body)} ${statusCode} ${statusMessage}`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message, this._context);
      }

      return this.logger.log(message, this._context);
    });

    next();
  }
}
