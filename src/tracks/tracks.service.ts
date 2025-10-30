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

    async findById(id: string) {
    return this.trackModel.findById(id).exec();
    }

    async incrementPlayCount(trackId: string) {
      return this.trackModel.updateOne({ _id: trackId }, { $inc: { playCount: 1 } });
    }

    // tracks.service.ts
    async getTrendingTracks(limit = 10) {
    return this.trackModel.find({
        order: {
        playCount: 'DESC',
        },
        take: limit,
    });
    }

    async searchTracks(title: string) {
    return this.trackModel.find({ title: { $regex: title, $options: 'i' } });
    }


}
