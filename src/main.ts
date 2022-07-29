import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import 'reflect-metadata';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = +process.env.APP_PORT || 3000;
  console.log('Port running on: ', port);
}
bootstrap();
