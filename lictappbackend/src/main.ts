import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    allowedHeaders: 'Authorization, Content-Type',
    exposedHeaders: 'Authorization',
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const port = app.get(ConfigService).get('PORT');
  const jwtSecret = app.get(ConfigService).get('JWT_SECRET');
  await app.listen(port || 3000);
  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();
