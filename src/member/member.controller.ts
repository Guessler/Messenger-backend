import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { MembersService } from './member.service';
import { Member } from './member.model';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
export class MemberController {
    constructor(private readonly membersService: MembersService) { }

    @Post()
    async addMember(@Body() dto: CreateMemberDto): Promise<Member> {
        return this.membersService.addMember(dto.userId, dto.workspaceId, dto.role);
    }

    @Get(':workspaceId')
    async getMembersByWorkspace(@Param('workspaceId') workspaceId: number): Promise<Member[]> {
        return this.membersService.getMembersByWorkspace(workspaceId);
    }

    @Put(':userId/role')
    async setMemberRole(
        @Param('userId') userId: number,
        @Query('workspaceId') workspaceId: number,
        @Body() dto: UpdateMemberDto,
    ): Promise<void> {
        return this.membersService.setMemberRole(userId, workspaceId, dto.role);
    }

    @Delete(':userId')
    async removeMember(
        @Param('userId') userId: number,
        @Query('workspaceId') workspaceId: number,
    ): Promise<void> {
        return this.membersService.removeMember(userId, workspaceId);
    }

    @Put(':userId/deactivate')
    async deactivateMember(
        @Param('userId') userId: number,
        @Query('workspaceId') workspaceId: number,
        @Body() dto: UpdateMemberDto,
    ): Promise<void> {
        return this.membersService.deactivateMember(userId, workspaceId);
    }
}