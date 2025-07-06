import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { Contact } from 'src/contacts/contacts.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({ example: 'Кирилл', description: 'Имя пользователя' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @ApiProperty({ example: 'user@gmail.com', description: 'Почтовый ящик' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    declare email: string;

    @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;

    @ApiProperty({ example: 'true', description: 'Заблокирован ли пользователь' })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    })
    banned?: boolean;

    @ApiProperty({ example: 'За нарушение правил', description: 'Причина блокировки' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    banReason?: string;


    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}
