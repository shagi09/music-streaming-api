import { IsString, IsMongoId, IsOptional, IsArray, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class CreateTrackDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsMongoId()
  @ApiProperty()
  artist: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty()
  album?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  trackNumber?: number;


  @ApiProperty({ type: 'string', format: 'binary' })
  fileUrl: any;
}
