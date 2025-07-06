import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
  ) {}

  async create(dto: CreateContactDto): Promise<Contact> {
    const { owner_id, contact_id, nickname } = dto;

    const owner = await this.userModel.findByPk(owner_id);
    if (!owner) throw new HttpException('Владелец не найден', HttpStatus.NOT_FOUND);

    const contactUser = await this.userModel.findByPk(contact_id);
    if (!contactUser) throw new HttpException('Контакт не найден', HttpStatus.NOT_FOUND);

    const existing = await this.contactModel.findOne({
      where: { owner_id, contact_id },
    });
    if (existing) throw new HttpException('Контакт уже существует', HttpStatus.CONFLICT);

    return this.contactModel.create(dto);
  }

  async findAll(ownerId: number): Promise<Contact[]> {
    return this.contactModel.findAll({
      where: { owner_id: ownerId },
      include: [
        { model: User, as: 'contact', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'owner', attributes: ['id', 'name', 'email'] },
      ],
    });
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactModel.findByPk(id, {
      include: [
        { model: User, as: 'contact', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'owner', attributes: ['id', 'name', 'email'] },
      ],
    });

    if (!contact) throw new HttpException('Контакт не найден', HttpStatus.NOT_FOUND);
    return contact;
  }

  async update(id: number, dto: UpdateContactDto): Promise<Contact> {
    const contact = await this.contactModel.findByPk(id);
    if (!contact) throw new HttpException('Контакт не найден', HttpStatus.NOT_FOUND);

    return contact.update(dto);
  }

  async remove(id: number): Promise<Contact> {
    const contact = await this.contactModel.findByPk(id);
    if (!contact) throw new HttpException('Контакт не найден', HttpStatus.NOT_FOUND);

    await contact.destroy();
    return contact;
  }
}