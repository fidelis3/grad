import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Appointment extends Document {
  @Prop({ required: true })
  patientName: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  time: string;

  @Prop({ required: true })
  reason: string;

  @Prop({ default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected';
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
