import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contact } from './contacts.model';
import { User } from '../users/users.model';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
    constructor(
        @InjectModel(Contact) private contactModel: typeof Contact,
        @InjectModel(User) private userModel: typeof User,
    ) { }


    async create(createContactDto: CreateContactDto): Promise<Contact> {
        const { owner_id, contact_id, nickname } = createContactDto;

        const owner = await this.userModel.findByPk(owner_id);
        if (!owner) {
            throw new Error('Пользователь не найден');
        }

        const contactUser = await this.userModel.findByPk(contact_id);
        if (!contactUser) {
            throw new Error('Контактный пользователь не найден');
        }

        const existingContact = await this.contactModel.findOne({
            where: { owner_id, contact_id },
        });
        if (existingContact) {
            throw new Error('Контакт уже добавлен');
        }

        const contact = await this.contactModel.create({
            owner_id,
            contact_id,
            nickname,
        });

        return contact;
    }


    async findAll(ownerId: number): Promise<Contact[]> {
        return this.contactModel.findAll({
            where: { owner_id: ownerId },
            include: [{ model: User, as: 'contact', attributes: ['id', 'username'] }],
        });
    }


    async findOne(id: number): Promise<Contact> {
        const contact = await this.contactModel.findByPk(id, {
            include: [{ model: User, as: 'contact', attributes: ['id', 'username'] }],
        });
    
        if (!contact) {
            throw new Error('Контакт не найден');
        }
    
        return contact;
    }


    async update(id: number, updateContactDto: UpdateContactDto): Promise<Contact> {
        const contact = await this.contactModel.findByPk(id);
        if (!contact) {
            throw new Error('Контакт не найден');
        }

        await contact.update(updateContactDto);
        return contact;
    }


    async remove(id: number): Promise<Contact> {
        const contact = await this.contactModel.findByPk(id);
        if (!contact) {
            throw new Error('Контакт не найден');
        }

        await contact.destroy();
        return contact;
    }


    async block(id: number): Promise<Contact> {
        const contact = await this.contactModel.findByPk(id);
        if (!contact) {
            throw new Error('Контакт не найден');
        }

        await contact.update({ is_blocked: true });
        return contact;
    }

    async unblock(id: number): Promise<Contact> {
        const contact = await this.contactModel.findByPk(id);
        if (!contact) {
            throw new Error('Контакт не найден');
        }

        await contact.update({ is_blocked: false });
        return contact;
    }
}