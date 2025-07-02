import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'Кирилл', description: 'Имя пользователя' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    readonly name: string;

    @ApiProperty({ example: 'user@gmail.com', description: 'Почта пользователя' })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    readonly email: string;

    @ApiProperty({ example: 'password12345', description: 'Пароль пользователя' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(32)
    readonly password: string;
}