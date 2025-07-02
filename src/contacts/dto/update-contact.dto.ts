import { IsOptional, IsString, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class UpdateContactDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    nickname?: string;

    @IsOptional()
    @IsBoolean()
    is_blocked?: boolean;
}