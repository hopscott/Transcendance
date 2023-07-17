import { Controller, Post, Body } from '@nestjs/common';

import { CredentialsDTO } from '../dto/credentials.dto';


@Controller('test/login')
export class LoginController {
  constructor() {}

  @Post()
  getCredentials(@Body() credentialsDto: CredentialsDTO): string {
    return "Credentials received: login=\"" + credentialsDto.username + "\" password=\"" + credentialsDto.password + "\"";
  }
}