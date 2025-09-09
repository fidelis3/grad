import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/appointments')
@Controller('doctor/appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Request() req,
  ) {
    console.log('Appointment POST request received');
    console.log(' Creating appointment with Test Patient');

    const appointmentData = {
      ...createAppointmentDto,
      patientId: 'temp-patient-id',
      patientName: createAppointmentDto.patientName || 'Test Patient',
      ...(createAppointmentDto.patientEmail && {
        patientEmail: createAppointmentDto.patientEmail,
      }),
    };
    return this.appointmentsService.create(appointmentData);
  }

  @Get()
  async findAll() {
    return this.appointmentsService.findAll();
  }

  @Get('my-appointments')
  async findMyAppointments(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.appointmentsService.findByPatientId(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.appointmentsService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateAppointmentDto>,
  ) {
    return this.appointmentsService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.appointmentsService.delete(id);
    return { message: 'Appointment deleted successfully' };
  }
}
export class DoctorAppointmentsController {
  doctorsService: any;
  constructor(private appointmentsService: AppointmentsService) {}

  @Get()
  async getMyAppointments(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.appointmentsService.findByDoctorId(req.user.sub);
  }

  @Get('pending')
  async getPending(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.appointmentsService.getPendingAppointments(req.user.sub);
  }

  @Put(':id/accept-reject')
  async acceptReject(
    @Param('id') id: string,
    @Body() body: { status: 'accepted' | 'rejected' },
    @Request() req,
  ) {
    return this.appointmentsService.acceptRejectAppointment(
      id,
      body.status,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      req.user.sub,
    );
  }

  @Post(':id/report')
  submitReport(
    @Param('id') id: string,
    @Body() reportData: any,
    @Request() req,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.doctorsService.submitReport(id, reportData, req.user.sub); // From doctors.service
  }
}
