import { IsString, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsOptional()
  @IsString()
  patientId?: string;

  @IsOptional()
  @IsString()
  patientName?: string;

  @IsOptional()
  @IsString()
  patientEmail?: string;

  @IsString()
  doctorId: string; // Changed to string

  @IsString()
  doctorName: string;

  @IsString()
  specialty: string;

  @IsString()
  date: string;

  @IsString()
  time: string;

  @IsString()
  type: string;

  @IsString()
  reason: string;

  @IsOptional()
  @IsString()
  status?: string; // 'pending' default
}