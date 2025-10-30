import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArtistsModule } from './artists/artists.module';
import { GenresController } from './genres/genres.controller';
import { GenresModule } from './genres/genres.module';
import { AlbumsService } from './albums/albums.service';
import { AlbumsModule } from './albums/albums.module';
import { TracksController } from './tracks/tracks.controller';
import { TracksModule } from './tracks/tracks.module';
import { PlaylistModule } from './playlist/playlist.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
    imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/frmusical'),
    UsersModule,
    AuthModule,
    ArtistsModule,
    GenresModule,
    AlbumsModule,
    TracksModule,
    PlaylistModule,
    FavoritesModule,
  ],
  controllers: [GenresController, TracksController],
  providers:[AlbumsService], 
  exports:[]
})
export class AppModule {}
