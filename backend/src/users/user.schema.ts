import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = Document & {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  professionalRole: ProfessionalRole;
  password: string;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  report?: any;
};

export enum ProfessionalRole {
  DOCTOR = 'doctor',
  PATIENT = 'patient',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({
    required: true,
    enum: ProfessionalRole,
    default: ProfessionalRole.PATIENT,
  })
  professionalRole: ProfessionalRole;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, default: null })
  resetPasswordToken?: string | null;

  @Prop({ type: Date, default: null })
  resetPasswordExpires?: Date | null;

  @Prop({ type: Object })
  report?: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
