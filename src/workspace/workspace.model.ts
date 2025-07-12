import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

enum Type {
    PRIVATE = 'PRIVATE',
    GROUP = 'GROUP'
}

@Table({ tableName: 'workspaces' })
export class Workspace extends Model<Workspace> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;


    @ApiProperty({ example: 1, description: 'ID создателя пространства' })
    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: number;

    @ApiProperty({ example: 1, description: 'ID человека, которому написали'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    type: Type
}