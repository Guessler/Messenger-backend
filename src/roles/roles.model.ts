import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';

interface RoleCreationAttrs {
    role: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @ApiProperty({example: 'admin', description: 'роль пользователя'})
    @Column({ type: DataType.STRING, allowNull: false })
    declare role: string;
}
