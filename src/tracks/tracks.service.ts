import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track } from './schemas/tracks.schema';
import { CreateTrackDto } from './dtos/create-track.dto';

@Injectable()
export class TracksService {
    constructor(@InjectModel(Track.name) private trackModel: Model<Track>) {}

    async findAll(): Promise<Track[]> {
        return this.trackModel.find().exec();
    }

    async create(dto: CreateTrackDto): Promise<Track> {
        return this.trackModel.create(dto);
    }

async findById(id: number) {
  return this.trackModel.findOne({ where: { id } });
}

}
