import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  passwordHash?: string;

  @Prop({ unique: true, sparse: true })
  username?: string;

  @Prop()
  avatarUrl?: string;

  @Prop({ type: String })
  bio?: string;

  @Prop({ default: false })
  emailVerified?: boolean;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role?: UserRole;

  @Prop({ type: Object, default: {} })
  oauth?: any; // store provider info like { google: { id, profile } }
}

export const UserSchema = SchemaFactory.createForClass(User);
