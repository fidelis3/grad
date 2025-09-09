import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { DoctorsService } from '../doctors/doctors.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { RegisterUserDto } from '../users/dto/register-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { RequestPasswordResetDto } from '../users/dto/request-password-reset.dto';
import { ResetPasswordDto } from '../users/dto/reset-password.dto';
import { RegisterDto } from '../doctors/dto/register.dto';
import { ProfessionalRole, UserDocument } from '../users/user.schema';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly doctorsService: DoctorsService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    if (registerUserDto.password !== registerUserDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = (await this.usersService.createUser(
      registerUserDto,
    )) as UserDocument;

    const { password, ...result } = user.toObject() as {
      password: string;
      [key: string]: any;
    };

    return {
      message: 'User registered successfully',
      user: result,
    };
  }

  async registerDoctor(dto: RegisterDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const existing = await this.usersService.findUserByEmail(dto.email);
    if (existing) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const userData = {
      ...dto,
      fullname: dto.fullName || '',
      password: hashedPassword,
      professionalRole: ProfessionalRole.DOCTOR,
    };
    const user = (await this.usersService.createUser(
      userData as RegisterUserDto,
    )) as UserDocument;

    this.logger.log(
      `User created: ${user.email} with role: ${user.professionalRole}`,
    );

    await this.doctorsService.createDoctorProfile(
      user._id.toString(),
      dto.specialty || '',
      dto.licenseNumber || '',
      dto.experienceYears || 0,
    );

    return this.createToken(user);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    this.logger.log('Login attempt with:', loginUserDto);
    const { email, password } = loginUserDto;

    const user = (await this.usersService.validateUserCredentials(
      email,
      password,
    )) as UserDocument | null;
    this.logger.log(
      'User found:',
      user ? { email: user.email, _id: user._id } : 'null',
    );

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    this.logger.log('Password valid:', isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: userPassword, ...userResult } = user.toObject() as {
      password: string;
      [key: string]: any;
    };

    const payload = {
      sub: user._id.toString(),
      email: user.email,
      professionalRole: user.professionalRole,
    };

    const accessToken = this.jwtService.sign(payload);
    this.logger.log('Token generated:', accessToken);

    return {
      message: 'Login successful',
      user: userResult,
      accessToken,
    };
  }

  async loginDoctor(email: string, password: string) {
    this.logger.log(`Doctor login attempt for: ${email}`);
    const user = await this.usersService.findUserByEmail(email);
    this.logger.log(
      'User found:',
      user
        ? { email: user.email, _id: user._id, role: user.professionalRole }
        : 'null',
    );

    if (!user || !(await bcrypt.compare(password, user.password))) {
      this.logger.warn(
        `Failed login attempt for ${email} - Password match: ${await bcrypt.compare(password, user?.password || '')}`,
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.professionalRole !== ProfessionalRole.DOCTOR) {
      this.logger.warn(
        `Failed login attempt for ${email} - Role is ${user.professionalRole}, expected ${ProfessionalRole.DOCTOR}`,
      );
      throw new UnauthorizedException('Doctor access only');
    }

    const payload = {
      sub: user._id.toString(),
      email: user.email,
      professionalRole: user.professionalRole,
    };

    const accessToken = this.jwtService.sign(payload);
    this.logger.log('Token generated for doctor:', accessToken);

    return {
      message: 'Doctor login successful',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      user: user.toObject(),
      accessToken,
    };
  }

  async requestPasswordReset(requestDto: RequestPasswordResetDto) {
    const { email } = requestDto;
    const resetToken =
      await this.usersService.generatePasswordResetToken(email);

    return {
      message: 'Password reset token generated successfully',
      resetToken,
      expiresIn: '15 minutes',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { resetToken, newPassword, confirmPassword } = resetPasswordDto;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    await this.usersService.resetPassword(resetToken, newPassword);

    return {
      message: 'Password reset successfully. You can now login with your new password.',
    };
  }

  async doctorRequestResetPassword(email: string) {
    const user = (await this.usersService.findUserByEmail(email)) as UserDocument | null;
    if (!user || user.professionalRole !== ProfessionalRole.DOCTOR) {
      throw new BadRequestException('Doctor not found');
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.set('resetPasswordToken', token);
    user.set('resetPasswordExpires', new Date(Date.now() + 3600000));
    await this.usersService.update(user._id.toString(), user);

    this.logger.log(`Reset token generated for ${email}`);

    return {
      message: 'Reset token sent to email (check console for token)',
      token,
    };
  }

  async doctorChangePassword(token: string, newPassword: string) {
    const user = (await this.usersService.findByResetToken(token)) as UserDocument | null;

    if (
      !user ||
      (user.resetPasswordExpires && user.resetPasswordExpires < new Date()) ||
      user.professionalRole !== ProfessionalRole.DOCTOR
    ) {
      throw new BadRequestException('Invalid or expired token for doctor');
    }

    user.set('password', await bcrypt.hash(newPassword, 10));
    user.set('resetPasswordToken', null);
    user.set('resetPasswordExpires', null);

    await this.usersService.update(user._id.toString(), user);

    this.logger.log(`Password changed for user ${user.email}`);

    return { message: 'Password changed successfully' };
  }

  private createToken(user: UserDocument): { accessToken: string } {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      professionalRole: user.professionalRole,
    };
    return { accessToken: this.jwtService.sign(payload) };
  }
}