import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteSchema } from './schemas/favorites.schema';
import { Favorite } from './schemas/favorites.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Favorite.name,schema:FavoriteSchema}])
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService]
})
export class FavoritesModule {}
