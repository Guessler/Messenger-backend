import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Member } from './member.model';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { User } from 'src/users/users.model';

@Injectable()
export class MembersService {
    constructor(
        @InjectModel(Member)
        private memberRepository: typeof Member,
    ) { }

    async addMember(userId: number, workspaceId: number, role?: string): Promise<Member> {
        return this.memberRepository.create({
            userId,
            workspaceId,
            role: role || 'member',
            isActive: true,
        });
    }

    async getMembersByWorkspace(workspaceId: number): Promise<Member[]> {
        return this.memberRepository.findAll({
            where: { workspaceId },
            include: [{ model: User, as: 'user' }],
        });
    }

    async setMemberRole(userId: number, workspaceId: number, role: string): Promise<void> {
        await this.memberRepository.update(
            { role },
            { where: { userId, workspaceId } }
        );
    }

    async deactivateMember(userId: number, workspaceId: number): Promise<void> {
        await this.memberRepository.update(
            { isActive: false },
            { where: { userId, workspaceId } }
        );
    }

    async removeMember(userId: number, workspaceId: number): Promise<void> {
        await this.memberRepository.destroy({
            where: { userId, workspaceId },
        });
    }
}