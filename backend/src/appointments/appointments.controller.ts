import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/appointments')

export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto, @Request() req) {
    console.log('Appointment POST request received');
    console.log(' Creating appointment with Test Patient');
    
    
    const appointmentData = {
      ...createAppointmentDto,
      patientId: 'temp-patient-id',
      patientName: createAppointmentDto.patientName || 'Test Patient',
      ...(createAppointmentDto.patientEmail && { patientEmail: createAppointmentDto.patientEmail }),
    };
    return this.appointmentsService.create(appointmentData);
  }

  @Get()
  async findAll() {
    return this.appointmentsService.findAll();
  }

  @Get('my-appointments')
  async findMyAppointments(@Request() req) {
    return this.appointmentsService.findByPatientId(req.user.userId);
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
    return { message: 'Appointment deleted successfully' };
  }
}
