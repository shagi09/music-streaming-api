import { Controller,Get,Post,Body,Param,UseGuards } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { ApiTags,ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Artists')
@Controller('artists')
export class ArtistsController {
    constructor(private readonly artistsService: ArtistsService) {}

    @ApiOperation({ summary: 'Get all artists' })
    @UseGuards(JwtAuthGuard)
    @Get('get-artists')
    async findAll() {
      return this.artistsService.findAll();
    }

    @ApiOperation({ summary: 'Create artist' })
    @UseGuards(JwtAuthGuard)
    @Post('create-artist')
    async create(@Body() dto: CreateArtistDto) {
      return this.artistsService.create(dto);
    }

    @ApiOperation({ summary: 'Get artist by id' })
    @UseGuards(JwtAuthGuard)
    @Get('get-artist/:id')
    async findById(@Param() id: string) {
      return this.artistsService.findById(id);
    }
}
