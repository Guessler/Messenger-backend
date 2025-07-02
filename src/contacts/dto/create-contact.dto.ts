import { IsNumber, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateContactDto {
    @IsNumber()
    owner_id: number;

    @IsNumber()
    contact_id: number;

    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    nickname?: string;
}