import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

export interface ConversationCreationAttrs {
    type: string;
    name?: string;
}

// @ApiProperty({ description: 'Чат' })
@Table({ tableName: 'conversations' })
export class Conversation extends Model<Conversation, ConversationCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный ID беседы' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({ example: 'private or group', description: 'Тип беседы' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isIn: [['private', 'group']],
        },
    })
    type: string;

    @ApiProperty({ example: 'Рабочий чат', description: 'Название беседы (только для групп)' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    name: string;


}