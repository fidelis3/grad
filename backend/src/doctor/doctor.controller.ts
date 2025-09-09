import { Controller, Get, Put, Param, Body, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get('appointments')
  async getAppointments() {
    return this.doctorService.getAppointments();
  }

  @Put('appointments/:id/accept-reject')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'accepted' | 'rejected',
  ) {
    return this.doctorService.updateStatus(id, status);
  }

  @Get('dashboard')
  async getDashboard() {
    return this.doctorService.getDashboard();
  }

  @Get('appointments/:id/report')
  async getReport(@Param('id') id: string) {
    return this.doctorService.getReport(id);
  }

  @Post('ai-assistant')
  async aiAssistant(@Body('symptoms') symptoms: string) {
    return this.doctorService.aiAssistant(symptoms);
  }
}
