import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs"
import { User } from 'src/users/users.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private UserService: UsersService, private jwtService: JwtService) { }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const condidate = await this.UserService.getUsersByEmail(userDto.email)
        if (condidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.UserService.createUser({ ...userDto, password: hashPassword })
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles, name: user.name }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.UserService.getUsersByEmail(userDto.email)
        if (!user) {
            throw new UnauthorizedException({ message: 'Некорректный email или пароль' });
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Некорректный email или пароль' })
    }
}
