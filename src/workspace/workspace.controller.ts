import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Workspace } from './workspace.model';
import { WorkspaceService } from './workspace.service';

@Controller('workspaces')
export class WorkspaceController {
    constructor(private readonly workspacesService: WorkspaceService) {}

    @Post()
    async createWorkspace(
        @Body('name') name: string,
        @Body('type') type: string,
    ): Promise<Workspace> {
        return this.workspacesService.createWorkspace(name, type);
    }

    @Get()
    async getAllWorkspaces(): Promise<Workspace[]> {
        return this.workspacesService.getAllWorkspaces();
    }

    @Get(':id')
    async getWorkspaceById(@Param('id') id: number): Promise<Workspace | null> {
        return this.workspacesService.getWorkspaceById(id);
    }
}