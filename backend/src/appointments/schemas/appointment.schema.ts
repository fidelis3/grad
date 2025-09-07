import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ required: true })
  patientId: string;

  @Prop({ required: true })
  patientName: string;

  @Prop({ required: false })
  patientEmail: string;

  @Prop({ required: true })
  doctorId: number;

  @Prop({ required: true })
  doctorName: string;

  @Prop({ required: true })
  specialty: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true, default: 'confirmed' })
  status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
