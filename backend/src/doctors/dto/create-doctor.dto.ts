// backend/src/doctors/dto/create-doctor.dto.ts
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateDoctorDto {
  @IsString() specialty: string;
  @IsString() licenseNumber: string;
  @IsNumber() @Min(0) experienceYears: number;
}
