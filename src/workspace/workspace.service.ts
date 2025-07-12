import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Workspace } from './workspace.model';

@Injectable()
export class WorkspaceService {
    constructor(
        @InjectModel(Workspace)
        private workspaceRepository: typeof Workspace,
    ) {}

    async createWorkspace(name: string, type: string): Promise<Workspace> {
        return this.workspaceRepository.create({ name, type });
    }

    async getAllWorkspaces(): Promise<Workspace[]> {
        return this.workspaceRepository.findAll();
    }

    async getWorkspaceById(id: number): Promise<Workspace | null> {
        return this.workspaceRepository.findByPk(id);
    }
}