import { IsString, IsNumber, IsOptional } from 'class-validator';

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

  @IsNumber()
  doctorId: number;

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
  status?: string;
}
