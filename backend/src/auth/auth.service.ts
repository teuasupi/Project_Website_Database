import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import type { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private users: UserService,
    private jwt: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.users.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (!match) return null;
    // remove password
    const { password: _password, ...rest } = user;
    // avoid 'variable assigned but never used' lint
    void _password;
    return rest;
  }

  login(user: Partial<User>) {
    const payload = {
      sub: user.id as number,
      email: user.email as string,
      role: user.role as string,
      isVerified: user.isVerified as boolean,
    };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
