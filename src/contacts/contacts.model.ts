import { Table, Model } from 'sequelize-typescript';
import { Column, DataType, ForeignKey } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';

@Table({ tableName: 'contacts' })
export class Contact extends Model<Contact> {
    @ApiProperty({ example: '1', description: 'Уникальный ID записи контакта' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({ example: '100', description: 'ID пользователя, который добавил контакт' })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    owner_id: number;

    @ApiProperty({ example: '101', description: 'ID пользователя, который является контактом' })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    contact_id: number;

    @ApiProperty({ example: 'JohnDoe', description: 'Псевдоним для контакта (необязательно)' })
    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    nickname: string;

    @ApiProperty({ example: 'false', description: 'Заблокирован ли контакт' })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_blocked: boolean;

    @ApiProperty({ example: '2025-04-05T12:00:00Z', description: 'Дата добавления контакта' })
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    created_at: Date;
}