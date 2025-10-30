import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Artist } from 'src/artists/schemas/artists.schema';
import { Album } from 'src/albums/schemas/albums.schema';

export type TrackDocument = Track & Document;

@Schema({ timestamps: true })
export class Track {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Artist', required: true })
  artist: Types.ObjectId | Artist;

  @Prop({ type: Types.ObjectId, ref: 'Album' })
  album?: Types.ObjectId | Album;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Genre' }], default: [] })
  genres: Types.ObjectId[];

  @Prop({ type: [String], default: [] })
  moods: string[]; // e.g. ['chill','workout']

  // @Prop({ type: Number, required: true })
  // duration: number; // seconds

  @Prop({ default: false })
  explicit: boolean;

  @Prop()
  trackNumber?: number;

  @Prop()
  playCount?: number;

  @Prop() // file location (S3 or internal CDN)
  fileUrl: string;

  // @Prop({type: Object})
  // metadata?: {
  //   bitrate?: number;
  //   sampleRate?: number;
  //   format?: string;
  //   codec?: string;
  // };
}

export const TrackSchema = SchemaFactory.createForClass(Track);
TrackSchema.index({ title: 'text' });
