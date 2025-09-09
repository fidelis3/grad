import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@Schema({ timestamps: true })
export class Doctor {
  @Prop({ required: true })
  userId: string;

  @Prop()
  specialty: string;

  @Prop()
  licenseNumber: string;

  @Prop()
  experienceYears: number;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
