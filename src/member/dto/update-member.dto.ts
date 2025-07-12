import { ApiProperty } from '@nestjs/swagger';

export class UpdateMemberDto {
    @ApiProperty({ example: 'admin', description: 'Новая роль участника' })
    role: string;

    @ApiProperty({ example: false, description: 'Статус активности участника' })
    isActive?: boolean;
}