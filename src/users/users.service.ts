import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { addRoleDto } from './dto/add-role.dto';
import { BunUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
    userModel: any;
    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService) {

    }
    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");

        if (!role) {
            throw new Error('Default role "USER" not found');
        }

        await user.$set('roles', [role.id]);
        user.roles = [role]
        return user;
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: ['roles']
        });
        return users
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async addRole(dto: addRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)
        if(role && user) {
            await user.$add('role',role.id)
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }

    async ban(dto: BunUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if(!user) {
            throw new HttpException('Пользователь не найдены', HttpStatus.NOT_FOUND)
        }
        user.banned = true;
        user.banReason = dto.banReason
        await user?.save();
        return user
        
    }

    async getUsersByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, include: ['roles'] })
        return user
    }
}
