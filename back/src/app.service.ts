import { Injectable } from '@nestjs/common';
import { AuthDto } from './auth/dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'test ok';
  }

  async test(dto: AuthDto) {
    // console.log(dto);
  }

}
