import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from './prisma/prisma.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static'; // Add this import.
import { SocketEvents } from './websocket/websocket.gateway';
import { SocketService } from './websocket/websocket.service';
// import { WebsocketGateway } from './websocket/websocket.gateway';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.jwtSecret,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Set the root path to the "public" folder.
    }),
    MulterModule.register({
      dest: 'public/images/',
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, SocketEvents, SocketService],
})
export class AppModule {}
