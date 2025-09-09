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
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createAppointmentDto: CreateAppointmentDto, @Request() req) {
    const appointmentData = {
      ...createAppointmentDto,
      patientId: req.user.sub,
      patientName: createAppointmentDto.patientName || req.user.fullname || 'Patient',
      status: 'pending',
    };
    return this.appointmentsService.create(appointmentData);
  }

  @Get()
  async findAll() {
    return this.appointmentsService.findAll();
  }

  @Get('my-appointments')
  @UseGuards(JwtAuthGuard)
  async findMyAppointments(@Request() req) {
    return this.appointmentsService.findByPatientId(req.user.sub);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.appointmentsService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<CreateAppointmentDto>) {
    return this.appointmentsService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.appointmentsService.delete(id);
    return { message: 'Appointment deleted' };
  }
}

@Controller('doctor/appointments')
@UseGuards(JwtAuthGuard)
export class DoctorAppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  async getMyAppointments(@Request() req) {
    return this.appointmentsService.findByDoctorId(req.user.sub);
  }

  @Get('pending')
  async getPendingAppointments(@Request() req) {
    return this.appointmentsService.getPendingAppointments(req.user.sub);
  }

  @Put(':id/accept-reject')
  async acceptReject(
    @Param('id') id: string,
    @Body() body: { status: 'accepted' | 'rejected' },
    @Request() req,
  ) {
    return this.appointmentsService.acceptRejectAppointment(id, body.status, req.user.sub);
  }

  @Post(':id/report')
  async submitReport(
    @Param('id') id: string,
    @Body() reportData: { report: string },
    @Request() req,
  ) {
    return this.appointmentsService.submitReport(id, reportData.report, req.user.sub);
  }
}