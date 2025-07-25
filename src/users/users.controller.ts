import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { FindUserDto } from './dto/findByEmail.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.quard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { addRoleDto } from './dto/add-role.dto';
import { BunUserDto } from './dto/ban-user.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({ summary: 'Поиск пользователя по email' })
    @ApiOperation({ summary: 'Выдать роль' })
    @ApiResponse({ status: 200})

    @Post('/role')
    addRole(@Body() dto: addRoleDto) {
        return this.userService.addRole(dto)
    }

    @ApiOperation({ summary: 'Забанить пользователя' })
    @ApiResponse({ status: 200})

    @Post('/ban')
    banRole(@Body() dto: BunUserDto) {
        return this.userService.ban(dto)
    }

    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    @Post('find')
    async findUserByEmail(@Body() dto: FindUserDto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        return user;
    }
}