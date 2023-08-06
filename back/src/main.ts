import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // Import NestExpressApplication
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { WebSocketAdapter } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SocketIOAdapter } from './websocket/socket-io-adapter';
import { ConfigService } from '@nestjs/config';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useWebSocketAdapter(new IoAdapter(app));
  // Set the public directory to serve static files.
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // app.enableCors({
  //   origin: [ 'http://localhost:8000'],
  //   allowedHeaders: 'Content-Type, Accept, Authorization',
  //   methods: 'GET, PATCH, POST, PUT, DELETE, OPTIONS',
  //   credentials: true,
  // });
  app.useWebSocketAdapter(new SocketIOAdapter(app, new ConfigService));

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
