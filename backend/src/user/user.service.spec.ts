import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import type { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

// Small test helper: safely extract nested fullname from the create call arg.
// We restrict the eslint-disable to just this helper because it needs a
// narrow 'any' access to traverse unknown shapes returned by Jest mocks.
// ...existing code...

describe('UserService', () => {
  let service: UserService;

  type UserDelegateMock = {
    create: jest.Mock;
    findUnique: jest.Mock;
  };

  const mockPrisma: { user: UserDelegateMock } = {
    user: {
      create: jest.fn().mockImplementation(
        ({ data }: { data?: { email?: string } }) =>
          ({
            id: 1,
            email: data?.email,
          }) as User,
      ),
      findUnique: jest.fn().mockImplementation(() => null),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('creates a user and returns created user', async () => {
    const dto: CreateUserDto = {
      email: 'x@y.z',
      password: 'secret',
      fullname: 'Test',
    };
    const result = await service.create(dto);
    expect(result).toHaveProperty('id');
    expect(result.email).toBe(dto.email);
  });

  it('passes profile.create when fullname is provided', async () => {
    const dto: CreateUserDto = {
      email: 'p@q.r',
      password: 'secret',
      fullname: 'Profile Name',
    };
    const userMock = mockPrisma.user;
    userMock.create.mockClear();
    await service.create(dto);
    expect(userMock.create).toHaveBeenCalled();
    // The mock call return shapes are dynamic; use narrow disables here so the
    // test can assert the nested fullname without widening types globally.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const calledArg = userMock.create.mock.calls[0][0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(calledArg.data.profile.create.fullname).toBe('Profile Name');
  });

  it('propagates prisma errors from create', async () => {
    const dto: CreateUserDto = { email: 'err@x.y', password: 'secret' };
    const error = new Error('prisma failure');
    mockPrisma.user.create.mockRejectedValueOnce(error);
    await expect(service.create(dto)).rejects.toBeInstanceOf(
      InternalServerErrorException,
    );
  });

  it('throws ConflictException if email already exists', async () => {
    // mock findUnique to return an existing user
    mockPrisma.user.findUnique.mockResolvedValueOnce({
      id: 2,
      email: 'dup@a.b',
    } as User);

    const dto: CreateUserDto = { email: 'dup@a.b', password: 'secret' };
    await expect(service.create(dto)).rejects.toBeInstanceOf(ConflictException);
  });
});
