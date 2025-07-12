import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { MessageModule } from './message/message.module';
import { Workspace } from './workspace/workspace.model';
import { Message } from './message/message.model';
import { ContactsModule } from './contacts/contacts.module';
import { ConversationsModule } from './conversations/conversations.module';
import { Contact } from './contacts/contacts.model';
import { MembersModule } from './member/member.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      models: [User, Role, UserRoles, Workspace, Message, Contact],
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    WorkspaceModule,
    MessageModule,
    ContactsModule,
    ConversationsModule,
    MembersModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
