import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Member } from './member.model';
import { MembersService } from './member.service';
import { MemberController } from './member.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Member]),
  ],
  providers: [MembersService],
  controllers: [MemberController],
  exports: [MembersService],
})
export class MembersModule {}