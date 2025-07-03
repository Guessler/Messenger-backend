import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateContactDto {
    @IsNumber()
    owner_id: number;

    @IsNumber()
    contact_id: number;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    nickname?: string;

    @IsOptional()
    @IsBoolean()
    is_blocked?: boolean;
}