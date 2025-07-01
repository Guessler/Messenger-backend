import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'Кирилл', description: 'Имя' })
    readonly name: string;
    @ApiProperty({ example: 'user@gmail.com', description: 'Почта' })
    readonly email: string;
    @ApiProperty({ example: 'password12345', description: 'Пароль' })
    readonly password: string;
}