import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { Types } from 'mongoose';
import { DoctorsService } from './doctors.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // JWT Auth Guard
import { CreateDoctorDto } from './dto/create-doctor.dto'; // Created DTO

type JwtRequest = ExpressRequest & { user: { sub: string } };
/*
//@Get('ai-assistant')
//@UseGuards(JwtAuthGuard)
//async getAIResponse(@Body() body: { symptoms: string }, @Request() req) {
    // Mock; later integrate Llama 3 API
    //return { response: 'Based on symptoms: Possible flu. Consult a doctor.' };
    */
@Controller('doctor')
@UseGuards(JwtAuthGuard)
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  async createProfile(
    @Request() req: JwtRequest,
    @Body() dto: CreateDoctorDto,
  ) {
    return this.doctorsService.createDoctorProfile(
      new Types.ObjectId(req.user.sub).toString(),
      dto.specialty,
      dto.licenseNumber,
      dto.experienceYears,
    );
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  async getDashboard(@Request() req: JwtRequest): Promise<unknown> {
    const dashboard: unknown = await this.doctorsService.getDashboardData(
      new Types.ObjectId(req.user.sub).toString(),
    );
    return dashboard;
  }
}
