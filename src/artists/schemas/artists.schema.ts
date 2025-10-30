import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema({ timestamps: true })
export class Artist {
  @Prop({ required: true, unique: true }) // unique stage name
  name: string;

  @Prop() // biography or description
  bio?: string;

  @Prop() // url to artist image
  avatarUrl?: string;

  @Prop({ default: [] })
  genres?: string[]; // convenience list of main genres

  @Prop({ type: Object, default: {} })
  metadata?: any;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
ArtistSchema.index({ name: 'text', bio: 'text' });
