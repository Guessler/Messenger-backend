import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateWorkspaceDto {
    @ApiProperty({ example: 'Рабочее пространство 1', description: 'Название рабочего пространства' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    readonly name: string;

    @ApiProperty({ example: '1', description: 'ID владельца рабочего пространства' })
    @IsNumber()
    @IsNotEmpty()
    readonly ownerId: number;
}