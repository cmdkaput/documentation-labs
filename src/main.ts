import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runLab4 } from './lab4/lab4.runner';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('Starting Lab 4 execution');
  await runLab4();

  await app.listen(3000);
  console.log('App is listening on port 3000');
}

bootstrap();