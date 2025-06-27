import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { Workspace } from './workspace.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [WorkspaceService],
  controllers: [WorkspaceController],
  imports: [SequelizeModule.forFeature([Workspace])]
})
export class WorkspaceModule {}
