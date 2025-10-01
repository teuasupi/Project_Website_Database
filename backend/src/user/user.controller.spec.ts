import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;
  const mockUserService: Partial<UserService> = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('register returns SafeUser', async () => {
    (mockUserService.findByEmail as jest.Mock).mockResolvedValueOnce(null);
    (mockUserService.create as jest.Mock).mockResolvedValueOnce({
      id: 5,
      email: 'ok@a.b',
    });
    const dto: CreateUserDto = { email: 'ok@a.b', password: 'secret' };
    const res = await controller.register(dto);
    expect(res).toEqual({ id: 5, email: 'ok@a.b' });
  });
});
