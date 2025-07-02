// src/message/message.model.ts
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface MessageCreationArgs {
    content: string;
    senderId: number;
    recipientId: number;
}

@Table({ tableName: 'messages' })
export class Message extends Model<Message, MessageCreationArgs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор сообщения' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({ example: 'Hello, World!', description: 'Содержимое сообщения' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    content: string;

    @ApiProperty({ example: '1', description: 'ID отправителя' })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    senderId: number;

    @ApiProperty({ example: '1', description: 'ID получателя' })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    recipientId: number;
}
