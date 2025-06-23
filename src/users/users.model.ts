import { Model } from 'sequelize';
import { Column, DataType, Table } from 'sequelize-typescript';

Table({ tableName: 'users' });
export class User extends Model<User> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true,})
    id: number;
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;
    @Column({ type: DataType.STRING, unique: true })
    password: string;
}
