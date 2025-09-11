import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from './doctor.schema';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
  ) {}

  async getAppointments(): Promise<Appointment[]> {
    return this.appointmentModel.find().exec();
  }

  async updateStatus(id: string, status: 'accepted' | 'rejected') {
    const appointment = await this.appointmentModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  async getDashboard() {
    const totalPatients = await this.appointmentModel.countDocuments();
    const earnings = totalPatients * 50; // example
    const appointments = await this.appointmentModel.find().limit(5);

    return {
      fullName: 'John Doe',
      patients: totalPatients,
      earnings,
      appointments,
    };
  }

  async getReport(id: string) {
    const appointment = await this.appointmentModel.findById(id);
    if (!appointment) throw new NotFoundException('No report available');
    return {
      hct: [
        {
          testName: 'Hct',
          hct: '40',
          adm: '35',
          result: 'Normal',
          mnh: 30,
          max: 45,
        },
      ],
      hba1c: [
        {
          testName: 'HbA1c',
          icd: 'E11',
          adm: '6.0',
          result: 'Normal',
          mnh: 4,
          max: 6,
        },
      ],
      hgba1c: [
        {
          testName: 'HgbA1c',
          icd: 'D50',
          adm: '13',
          result: 'Normal',
          mnh: 12,
          max: 16,
        },
      ],
    };
  }

  async aiAssistant(symptoms: string) {
    // Simple mock (later integrate with AI)
    const response = await Promise.resolve(
      `Based on your symptoms: ${symptoms}, possible causes are ...`,
    );
    return { response };
  }
}
