import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contact } from './contacts.model';
import { User } from '../users/users.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Contact, User]), // Импортируем модели Contact и User
  ],
  providers: [ContactsService], // Объявляем сервис
  controllers: [ContactsController], // Объявляем контроллер
})
export class ContactsModule {}