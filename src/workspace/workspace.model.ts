import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table, BelongsToMany } from 'sequelize-typescript';

export interface WorkspaceCreationArgs {
    name: string;
    ownerId: number;
    roles?: string[];
}

@Table({ tableName: 'workspaces' })
export class Workspace extends Model<Workspace, WorkspaceCreationArgs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({ example: 'Рабочая группа', description: 'Название воркспейса' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @ApiProperty({ example: '1', description: 'ID владельца воркспейса' })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    ownerId: number;
}