import { IsString, IsInt, IsEnum, IsOptional } from 'class-validator';
import { ProfessionalRole } from '../../users/user.schema'; // Corrected path

export class RegisterDto {
  @IsString()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;

  @IsEnum(ProfessionalRole)
  professionalRole: ProfessionalRole;

  @IsString()
  @IsOptional()
  specialty?: string;

  @IsString()
  @IsOptional()
  licenseNumber?: string;

  @IsInt()
  @IsOptional()
  experienceYears?: number;
}
