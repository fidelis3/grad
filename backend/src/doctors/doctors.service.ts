import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoctorDocument } from './schemas/doctor.schema';
import { UsersService } from '../users/users.service';
import { AppointmentsService } from '../appointments/appointments.service';
import { AppointmentDocument } from '../appointments/schemas/appointment.schema';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel('Doctor') private doctorModel: Model<DoctorDocument>,
    private usersService: UsersService,
    private appointmentsService: AppointmentsService,
  ) {}

  async createDoctorProfile(
    userId: string,
    specialty: string,
    licenseNumber: string,
    experienceYears: number,
  ): Promise<DoctorDocument> {
    const createdDoctor = new this.doctorModel({
      userId,
      specialty,
      licenseNumber,
      experienceYears,
    });
    return await createdDoctor.save();
  }

  async getDashboardData(userId: string): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const user = await this.usersService.findUserById(userId);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!user || user.professionalRole !== 'doctor') {
      throw new Error('Access denied: Doctor only');
    }
    const doctor = await this.doctorModel.findOne({ userId }).exec();
    const appointments = await this.appointmentsService.findByDoctorId(userId);
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      fullName: user.fullName,
      specialty: doctor?.specialty || 'N/A',
      patients: appointments.length,
      earnings: 0, // Placeholder
      appointments,
    };
  }

  async submitReport(appointmentId: string, reportData: any): Promise<void> {
    const appointment = (await this.appointmentsService.findById(
      appointmentId,
    )) as AppointmentDocument;
    if (appointment) {
      appointment.set('report', reportData);
      await appointment.save();
    } else {
      throw new Error('Appointment not found');
    }
  }
}
