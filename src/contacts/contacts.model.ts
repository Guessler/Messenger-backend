import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/users.model';

@Table({ tableName: 'contacts' })
export class Contact extends Model<Contact> {
    @ApiProperty({ example: '1', description: 'Уникальный ID контакта' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({ example: '100', description: 'ID владельца' })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    owner_id: number;

    @ApiProperty({ example: '101', description: 'ID контакта' })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    contact_id: number;

    @ApiProperty({ example: 'JohnDoe', description: 'Псевдоним (опционально)' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    nickname: string;

    @ApiProperty({ example: 'false', description: 'Заблокирован ли контакт' })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_blocked: boolean;

    @ApiProperty({ example: '2025-04-05T12:00:00Z', description: 'Дата создания' })
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    created_at: Date;

    @BelongsTo(() => User, 'contact_id')
    contact: User;

    @BelongsTo(() => User, 'owner_id')
    owner: User;
}