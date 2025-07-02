import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './message.model';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message) private messageRepository: typeof Message) {}

    async create(dto: CreateMessageDto): Promise<Message> {
        return this.messageRepository.create(dto);
    }

    async getAll(): Promise<Message[]> {
        return this.messageRepository.findAll();
    }

    async getById(id: number): Promise<Message> {
        const message = await this.messageRepository.findByPk(id);
        if (!message) throw new Error('Сообщение не найдено');
        return message;
    }
}
