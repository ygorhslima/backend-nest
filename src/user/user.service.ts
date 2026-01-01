import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/browser';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;
  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }
}
