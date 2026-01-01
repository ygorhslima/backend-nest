import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { PrismaModule } from './database/prisma.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [UserController],
  providers: [PrismaService, UserService],
})
export class AppModule {}
