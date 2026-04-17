import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(process.cwd(), 'views'));  app.setViewEngine('ejs');
  await app.listen(3000);
  console.log(' Server is running at http://localhost:3000/restaurants');
}
bootstrap();
