import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GenreDocument = Genre & Document;

@Schema({ timestamps: true })
export class Genre {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description?: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
GenreSchema.index({ name: 1 });
