import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD
import { runLab4 } from './lab4/lab4.runner';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('Starting Lab 4 execution');
  await runLab4();

  await app.listen(3000);
  console.log('App is listening on port 3000');
}

bootstrap();
=======

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
>>>>>>> 3cdafd1f02c94cf7508146022d1762664a130728
