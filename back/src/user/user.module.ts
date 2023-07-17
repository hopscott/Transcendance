import { Module } from '@nestjs/common';

import { UserController } from './controller/user.controller';
import { UserService } from '../database/service/user.service';
import { PrismaModule } from 'src/database/prisma.module';
import { PrismaService } from 'src/database/service/prisma.service';
import { LoginController } from 'src/user/login/controller/login.controller'

@Module({
	imports: [PrismaModule],
	controllers: [UserController, LoginController],
	providers: [UserService, PrismaService]
})
export class UserModule {}