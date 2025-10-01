import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../common/decorators/get-user.decorator';
import { JwtPayload } from '../auth/types';

type SafeUser = { id: number; email: string };

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    // Basic uniqueness check
    const existing = await this.userService.findByEmail(dto.email);
    if (existing) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }
    const user = await this.userService.create(dto);
    // Do not return password hash - explicitly build safe object
    const safe: SafeUser = { id: user.id, email: user.email };
    return safe;
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@GetUser() user: JwtPayload | null): Promise<SafeUser> {
    // user is attached by JwtStrategy.validate
    if (!user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    return Promise.resolve({ id: user.sub, email: user.email });
  }
}
