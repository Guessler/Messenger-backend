import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';

import { User } from 'src/users/users.model';
import { Workspace } from 'src/workspace/workspace.model';

export interface MessageCreationArgs {
    content: string;
    senderId: number;
    workspaceId: number;
    isRead?: boolean;
}

@Table({ tableName: 'messages' })
export class Message extends Model<Message, MessageCreationArgs> {
    @ApiProperty({
        example: 1,
        description: 'Уникальный идентификатор сообщения',
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({
        example: 'Текст сообщения',
        description: 'Содержание сообщения',
    })
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    content: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    sendAt: Date;

    @ApiProperty({
        example: 123,
        description: 'ID отправителя',
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    senderId: number;

    @ApiProperty({
        example: 456,
        description: 'ID воркспейса (чата)',
    })
    @ForeignKey(() => Workspace)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    workspaceId: number;

    @ApiProperty({
        example: false,
        description: 'Прочитано ли сообщение',
    })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isRead: boolean;

    @BelongsTo(() => User, 'senderId')
    sender: User;

    @BelongsTo(() => Workspace, 'workspaceId')
    workspace: Workspace;
}