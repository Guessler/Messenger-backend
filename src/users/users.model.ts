import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { Contact } from 'src/contacts/contacts.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @ApiProperty({example: 'Кирилл', description: 'имя пользователя'})
    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;
    
    @ApiProperty({example: 'user@gmail.com', description: 'почтовый ящик'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    declare email: string;
    
    @ApiProperty({example: 'password123', description: 'пароль пользователя'})
    @Column({ type: DataType.STRING })
    declare password: string;

    @BelongsToMany (()=> Role, () => UserRoles)
    roles: Role[]
}
