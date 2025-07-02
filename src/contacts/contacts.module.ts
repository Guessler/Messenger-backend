import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contact } from './contacts.model';
import { User } from '../users/users.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Contact, User]),
  ],
  providers: [ContactsService],
  controllers: [ContactsController],
})
export class ContactsModule {}