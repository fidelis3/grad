import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const createdAppointment = new this.appointmentModel(createAppointmentDto);
    return createdAppointment.save();
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.find().exec();
  }

  async findByPatientId(patientId: string): Promise<Appointment[]> {
    return this.appointmentModel.find({ patientId }).exec();
  }

  async findById(id: string): Promise<Appointment | null> {
    return this.appointmentModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<CreateAppointmentDto>): Promise<Appointment | null> {
    return this.appointmentModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.appointmentModel.findByIdAndDelete(id).exec();
  }

}


