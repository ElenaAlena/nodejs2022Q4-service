import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import 'dotenv/config';
import { useContainer } from 'class-validator';
import { readFile } from 'node:fs/promises';
import * as yaml from 'js-yaml';

import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { HttpExceptionFilter } from './logger/exception-filter';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: false,
  });
  process
    .on('unhandledRejection', (reason) => {
      app.get(LoggerService).error(`Unhandled rejection. Reason: ${reason}`);
    })
    .on('uncaughtException', (err, origin) => {
      app
        .get(LoggerService)
        .error(`Uncaught exception: ${err}. Origin: ${origin}`);
      process.exit(1);
    });
  app.useLogger(app.get(LoggerService));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const document: any = yaml.load(
    await readFile('./doc/api.yaml', { encoding: 'utf-8' }),
  );
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();
