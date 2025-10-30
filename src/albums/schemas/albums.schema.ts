import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Artist } from 'src/artists/schemas/artists.schema';

export type AlbumDocument = Album & Document;

@Schema({ timestamps: true })
export class Album {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Artist', required: true })
  artist: Types.ObjectId | Artist;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Genre' }], default: [] })
  genres: Types.ObjectId[]; // references to Genre

  @Prop({ type: Date })
  releaseDate?: Date;

  @Prop({ default: 0 })
  trackCount?: number;

  @Prop()
  coverUrl?: string;

  @Prop({ type: Object, default: {} })
  metadata?: any;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
AlbumSchema.index({ title: 'text' });
