import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
import { Favorite } from './schemas/favorites.schema';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>
    ) {}

    async addFavorite(userId: string,trackId:string){
            const existing = await this.favoriteModel.findOne({ user: userId, track: trackId });
    if (existing) return { message: 'Track already in favorites' };

    const fav = new this.favoriteModel({
      user: new Types.ObjectId(userId),
      track: new Types.ObjectId(trackId),
    });

    await fav.save();
    return { message: 'Track added to favorites', favorite: fav };

    }

    async removeFavorite(userId: string,trackId:string){
        const deleted=await this.favoriteModel.findOneAndDelete({ user: userId, track: trackId });
        if(!deleted) return { message: 'Track not in favorites' };
        return { message: 'Track removed from favorites' };
    }

    async getUserFavorites(userId: string) {
    return this.favoriteModel
      .find({ user: userId })
      .populate('track')
      .exec();
  }
}
