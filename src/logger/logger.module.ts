import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService, LoggerMiddleware],
  exports: [LoggerService],
})
export class LoggerModule {}
