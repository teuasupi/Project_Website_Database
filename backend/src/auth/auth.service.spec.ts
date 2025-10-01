import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  const mockUsers: Partial<UserService> = {
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUsers },
        {
          provide: JwtService,
          useValue: { sign: jest.fn().mockReturnValue('token') },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('validateUser returns user without password when password matches', async () => {
    const hashed = await bcrypt.hash('secret', 10);
    const user = {
      id: 1,
      email: 'a@b.c',
      password: hashed,
      role: 'USER',
      isVerified: true,
    } as User;
    (mockUsers.findByEmail as jest.Mock).mockResolvedValueOnce(user);
    const result = await service.validateUser('a@b.c', 'secret');
    expect(result).toBeDefined();
    const r = result as Partial<User>;
    expect(r.email).toBe('a@b.c');
    expect(r.password).toBeUndefined();
    expect(r.role).toBe('USER');
    expect(r.isVerified).toBe(true);
  });

  it('validateUser returns null when password mismatches', async () => {
    const hashed = await bcrypt.hash('secret', 10);
    const user = {
      id: 2,
      email: 'x@y.z',
      password: hashed,
      role: 'ADMIN',
      isVerified: false,
    } as User;
    (mockUsers.findByEmail as jest.Mock).mockResolvedValueOnce(user);
    const result = await service.validateUser('x@y.z', 'wrong-password');
    expect(result).toBeNull();
  });

  it('validateUser returns null when user not found or password mismatch', async () => {
    (mockUsers.findByEmail as jest.Mock).mockResolvedValueOnce(null);
    expect(await service.validateUser('no@one.now', 'x')).toBeNull();
  });

  it('validateUser returns null when user not found or password mismatch', async () => {
    (mockUsers.findByEmail as jest.Mock).mockResolvedValueOnce(null);
    expect(await service.validateUser('no@one.now', 'x')).toBeNull();
  });
});
