import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceService } from './workspace.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Рабочие-пространства')
@Controller('workspaces')
export class WorkspaceController {
    constructor(private readonly workspaceService: WorkspaceService) {}

    @Post()
    async create(@Body() dto: CreateWorkspaceDto){
        return this.workspaceService.create(dto)
    }

    @Get()
    async getAll() {
        return this.workspaceService.getAll()
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.workspaceService.getById(id)
    }
}
