import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Сообщения')
@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post()
    async create(@Body() dto: CreateMessageDto) {
        return this.messageService.create(dto);
    }

    @Get()
    async getAll() {
        return this.messageService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.messageService.getById(id);
    }
}
