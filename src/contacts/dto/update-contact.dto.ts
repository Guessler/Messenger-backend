import { IsOptional, IsString, IsBoolean, MaxLength } from 'class-validator';

export class UpdateContactDto {
    @IsOptional()
    @IsString()
    @MaxLength(50)
    nickname?: string;

    @IsOptional()
    @IsBoolean()
    is_blocked?: boolean;
}