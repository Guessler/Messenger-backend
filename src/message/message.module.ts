// src/message/message.module.ts
import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './message.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [MessageService],
  controllers: [MessageController],
  imports: [SequelizeModule.forFeature([Message])],
})
export class MessageModule {}
