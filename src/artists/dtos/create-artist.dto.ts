import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  bio?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  avatarUrl?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  genres?: string[];
}
