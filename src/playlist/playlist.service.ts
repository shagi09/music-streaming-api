import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist } from './schemas/playlist.schema';

@Injectable()
export class PlaylistService {
  constructor(@InjectModel(Playlist.name) private playlistModel: Model<Playlist>){}

    async create(userId: string, name: string) {
    return this.playlistModel.create({ user: userId, name });
  }

  async deletePlaylist(userId: string, name: string) {
    return this.playlistModel.deleteOne({ user: userId, name });
  }

  async addTrackToPlaylist( playlistId: string, trackId: string) {
    const playlist = await this.playlistModel.findById(playlistId);
    if (!playlist) {
      throw new Error('Playlist not found');
    }
    return this.playlistModel.updateOne({ _id: playlistId }, { $addToSet: { tracks: trackId } });
  }

 async removeTrackFromPlaylist(playlistId: string, trackId: string) {
    const playlist = await this.playlistModel.findById(playlistId);
    if (!playlist) {
      throw new Error('Playlist not found');
    }
    return this.playlistModel.updateOne({ _id: playlistId }, { $pull: { tracks: trackId } });
  }

  async getPlaylists(userId: string) {
    return this.playlistModel.find({ user: userId }).exec();
  }
}
