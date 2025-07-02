import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Contact } from './contacts.model';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) { }


    @ApiOperation({ summary: 'Создание нового контакта' })
    @ApiResponse({ status: 201, description: 'Контакт успешно создан' })
    @Post()
    async create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
        return this.contactsService.create(createContactDto);
    }


    @ApiOperation({ summary: 'Получение всех контактов пользователя' })
    @ApiResponse({ status: 200, description: 'Список контактов' })
    @Get()
    async findAll(@Query('ownerId') ownerId: number): Promise<Contact[]> {
        return this.contactsService.findAll(ownerId);
    }


    @ApiOperation({ summary: 'Получение контакта по ID' })
    @ApiResponse({ status: 200, description: 'Контакт' })
    @ApiResponse({ status: 404, description: 'Контакт не найден' })
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Contact> {
        return this.contactsService.findOne(id);
    }


    @ApiOperation({ summary: 'Обновление контакта' })
    @ApiResponse({ status: 200, description: 'Контакт успешно обновлен' })
    @ApiResponse({ status: 404, description: 'Контакт не найден' })
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateContactDto: UpdateContactDto): Promise<Contact> {
        return this.contactsService.update(id, updateContactDto);
    }


    @ApiOperation({ summary: 'Удаление контакта' })
    @ApiResponse({ status: 200, description: 'Контакт успешно удален' })
    @ApiResponse({ status: 404, description: 'Контакт не найден' })
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<Contact> {
        return this.contactsService.remove(id);
    }
}