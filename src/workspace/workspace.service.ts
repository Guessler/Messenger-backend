import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Workspace } from './workspace.model';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

@Injectable()
export class WorkspaceService {
    constructor(@InjectModel(Workspace) private WorkspaceRepository: typeof Workspace) { }

    async create(dto: CreateWorkspaceDto): Promise<Workspace> {
        return this.WorkspaceRepository.create(dto);
    }

    async getAll() {
        return this.WorkspaceRepository.findAll()
    }

    async getById(id: number) {
        const workspace = await this.WorkspaceRepository.findByPk(id);
        if (!workspace) throw new Error('Воркспейс не найден');
        return workspace
    }
}
