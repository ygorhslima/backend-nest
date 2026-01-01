import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
