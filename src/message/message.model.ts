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
    senderId: string; // UUID
    workspaceId: string; // UUID
    isRead?: boolean;
}

@Table({ tableName: 'messages' })
export class Message extends Model<Message, MessageCreationArgs> {
    @ApiProperty({
        example: '1',
        description: 'Уникальный идентификатор сообщения',
    })
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        unique: true,
        primaryKey: true,
    })
    declare id: string;

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
        field: 'send_at',
    })
    sendAt: Date;

    @ApiProperty({
        example: 'user-uuid-123',
        description: 'ID отправителя',
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    senderId: string;

    @ApiProperty({
        example: 'workspace-uuid-456',
        description: 'ID воркспейса (чата)',
    })
    @ForeignKey(() => Workspace)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    workspaceId: string;

    @ApiProperty({
        example: 'false',
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