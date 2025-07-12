import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Workspace } from '../workspace/workspace.model';

@Table({ tableName: 'members' })
export class Member extends Model<Member> {
    @ApiProperty({ example: '1', description: 'Уникальный ID участника' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({ example: 'user-uuid-123', description: 'ID пользователя' })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @ApiProperty({ example: 'workspace-uuid-456', description: 'ID чата (воркспейса)' })
    @ForeignKey(() => Workspace)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    workspaceId: number;

    @ApiProperty({ example: 'true', description: 'Активен ли участник' })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    isActive: boolean;

    @ApiProperty({ example: 'admin', description: 'Роль участника в чате' })
    @Column({
        type: DataType.STRING,
        defaultValue: 'member',
    })
    role: string;

    @BelongsTo(() => User, 'userId')
    user: User;

    @BelongsTo(() => Workspace, 'workspaceId')
    workspace: Workspace;
}