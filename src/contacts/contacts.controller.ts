import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './contacts.model';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) { }

    @ApiOperation({ summary: 'Создание контакта' })
    @ApiResponse({ status: 201, description: 'Контакт создан', type: Contact })
    @Post()
    async create(@Body() dto: CreateContactDto): Promise<Contact> {
        return this.contactsService.create(dto);
    }

    @ApiOperation({ summary: 'Получение всех контактов пользователя' })
    @ApiResponse({ status: 200, description: 'Список контактов', type: [Contact] })
    @Get()
    async findAll(@Query('ownerId') ownerId: number): Promise<Contact[]> {
        return this.contactsService.findAll(ownerId);
    }

    @ApiOperation({ summary: 'Получение контакта по ID' })
    @ApiResponse({ status: 200, description: 'Контакт найден', type: Contact })
    @ApiResponse({ status: 404, description: 'Контакт не найден' })
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Contact> {
        return this.contactsService.findOne(id);
    }

    @ApiOperation({ summary: 'Обновление контакта' })
    @ApiResponse({ status: 200, description: 'Контакт обновлён', type: Contact })
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateContactDto,
    ): Promise<Contact> {
        return this.contactsService.update(id, dto);
    }

    @ApiOperation({ summary: 'Удаление контакта' })
    @ApiResponse({ status: 200, description: 'Контакт удалён', type: Contact })
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<Contact> {
        return this.contactsService.remove(id);
    }
}