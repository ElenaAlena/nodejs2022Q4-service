import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import 'dotenv/config';
import { useContainer } from 'class-validator';
import { readFile } from 'node:fs/promises';
import * as yaml from 'js-yaml';

import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const document: any = yaml.load(
    await readFile('./doc/api.yaml', { encoding: 'utf-8' }),
  );
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();
