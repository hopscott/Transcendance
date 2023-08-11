import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Param,
  UseFilters,
  ParseIntPipe,
  ConsoleLogger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomExceptionFilter } from './module/CustomExceptionFilter';
import { PrismaService } from 'src/prisma/prisma.service';
import { Multer, multer, diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from './module';
import { Response } from 'express';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Get('me/friends')
  async getFriends(@GetUser() user: User) {
    console.log('oke');
    const userFriends = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { friends: true },
    });
    // console.log(userFriends);
    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }
    return userFriends;
  }

  @Get('all')
  async findAll() {
    return this.userService.findAll();
  }

  @Get('leaderboard')
  async getLeaderBoard() {
    const all = await this.userService.getLeaderboard();
    return all;
  }

  @Get(':id')
  async findUserById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (userId === id)
      return { redirectTo: 'http://localhost:8000/profile/me' };
    try {
      const userMain = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          friends: {
            where: { id: id },
            select: { id: true },
          },
        },
      });
      // console.log("userMain:", userMain);
      const user: User | null = await this.prisma.user.findUnique({
        where: { id: id },
      });
      // console.log("userToFind:", userToFind);
      const data: any = {};
      data.user = { user };
      data.friendStatus = '';
      if (userMain.friends.length !== 0) data.friendStatus = 'Is friend';
      return { data };
    } catch (err) {}
  }

  @Patch('add-friend/:id')
  async addFriend(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) friendId: number,
  ) {
    return this.userService.addFriendToggler(userId, friendId);
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Post('pf')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: diskStorage({
        destination: 'public/images/',
        filename: editFileName,
      }),
    }),
  )
  @UseFilters(CustomExceptionFilter)
  async uploadProfilePic(@GetUser() user: User, @UploadedFile() file) {
    return this.userService.uploadProfilePic(user, file);
  }

  @Post('logout')
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.json({ message: 'Logout successful' });
  }
}
