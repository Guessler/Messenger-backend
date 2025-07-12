import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
    @ApiProperty({ example: 123, description: 'ID пользователя' })
    userId: number;

    @ApiProperty({ example: 456, description: 'ID воркспейса' })
    workspaceId: number;

    @ApiProperty({ example: 'admin', description: 'Роль участника (по умолчанию "member")', required: false })
    role?: string;

    @ApiProperty({ example: true, description: 'Активен ли участник', required: false })
    isActive?: boolean;
}