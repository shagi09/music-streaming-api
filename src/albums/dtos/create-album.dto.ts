import { IsString, IsOptional, IsMongoId, IsArray } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  title: string;

  @IsMongoId()
  artist: string;

  @IsOptional()
  @IsArray()
  genres?: string[]; // genre ids

  @IsOptional()
  releaseDate?: string; // ISO date string

  @IsOptional()
  coverUrl?: string;
}
