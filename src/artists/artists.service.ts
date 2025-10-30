import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from './schemas/artists.schema';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ArtistsService {
    constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>) {}

    async create(dto: CreateArtistDto): Promise<Artist> {
      return this.artistModel.create(dto);
    }

    async findAll(): Promise<Artist[]> {
      return this.artistModel.find().exec();
    }

    async findById(id: string): Promise<Artist> {
      const artist= await this.artistModel.findById(id).exec();
      if (!artist) {
        throw new NotFoundException('Artist not found');
      }
      return artist;
    }
}
