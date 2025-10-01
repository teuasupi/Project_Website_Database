import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import type { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Centralized typed accessor for the injected PrismaService. Keep a single
  // narrow cast here so other methods can use `this.db` without repeating casts.
  private get db(): PrismaService {
    return this.prisma as unknown as PrismaService;
  }

  // Create a new user with hashed password
  // Returns the created User (from Prisma)
  async create(dto: CreateUserDto): Promise<User> {
    if (!this.db || !this.db.user) {
      throw new Error('Prisma client not initialized');
    }

    let existing: User | null = null;
    try {
      existing = await this.db.user.findUnique({ where: { email: dto.email } });
    } catch {
      // surface DB errors as an exception (adjust message/type as needed)
      throw new InternalServerErrorException(
        'Database error while checking email',
      );
    }

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const data: Prisma.UserCreateInput = {
      email: dto.email,
      password: hashed,
    };

    // If a fullname is provided, create a linked Profile record
    if (dto.fullname) {
      data.profile = {
        create: { fullname: dto.fullname },
      } as Prisma.ProfileCreateNestedOneWithoutUserInput;
    }

    // Prisma will return the full User object
    try {
      return await this.db.user.create({ data });
    } catch {
      throw new InternalServerErrorException(
        'Database error while creating user',
      );
    }
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.db.user.findUnique({ where: { email } });
    } catch {
      throw new InternalServerErrorException(
        'Database error while finding user by email',
      );
    }
  }

  // Find user by id (select fields)
  async findById(id: number): Promise<User | null> {
    try {
      return await this.db.user.findUnique({ where: { id } });
    } catch {
      throw new InternalServerErrorException(
        'Database error while finding user by id',
      );
    }
  }
}
