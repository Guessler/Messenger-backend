import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    value: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description: string;
}